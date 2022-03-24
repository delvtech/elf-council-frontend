import {
  Fragment,
  ReactElement,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { Proposal, ProposalsJson } from "elf-council-proposals";
import { t } from "ttag";

import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import H2 from "src/ui/base/H2/H2";
import Tabs, { Tab } from "src/ui/base/Tabs/Tabs";
import {
  useIsTailwindSmallScreen,
  useIsTailwindLargeScreen,
} from "src/ui/base/tailwindBreakpoints";
import EmptySpaceFace from "src/ui/base/svg/EmptySpaceFace";
import { ProposalDetailsCard } from "src/ui/proposals/ProposalDetailsCard";
import { useSigner } from "src/ui/signer/useSigner";

import { ProposalList } from "./ProposalList/ProposalList";
import GradientCard from "src/ui/base/Card/GradientCard";

type TabId = "active" | "past";

interface ProposalsPageProps {
  proposalsJson: ProposalsJson;
  currentBlockNumber: number;
}

export default function ProposalsPage({
  proposalsJson,
  currentBlockNumber,
}: ProposalsPageProps): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeTabId, setActiveTabId] = useState<TabId>("active");

  const isTailwindSmallScreen = useIsTailwindSmallScreen();
  const isTailwindLargeScreen = useIsTailwindLargeScreen();

  const activeProposals = useFilteredProposals(
    "active",
    proposalsJson.proposals,
    currentBlockNumber,
  );
  const pastProposals = useFilteredProposals(
    "past",
    proposalsJson.proposals,
    currentBlockNumber,
  );

  const setDefaultActiveProposal = useCallback(() => {
    setSelectedProposalId(activeProposals?.[0]?.proposalId);
    setSelectedProposal(activeProposals?.[0]);
    activeProposals.length ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [activeProposals]);

  const setDefaultPastProposal = useCallback(() => {
    setSelectedProposalId(pastProposals?.[0]?.proposalId);
    setSelectedProposal(pastProposals?.[0]);
    pastProposals.length ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [pastProposals]);

  const calculateModalOpenState = () => {
    if (!isTailwindLargeScreen) {
      return false;
    }

    if (activeTabId === "active") {
      return !!activeProposals.length;
    }

    if (activeTabId === "past") {
      return !!pastProposals.length;
    }

    // Will not reach this
    return false;
  };

  const [isModalOpen, setIsModalOpen] = useState(calculateModalOpenState());

  // set the default to the first active proposal, since that's what filter is
  // on by default
  const [selectedProposalId, setSelectedProposalId] = useState<
    string | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0]?.proposalId);
  const [selectedProposal, setSelectedProposal] = useState<
    Proposal | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0]);

  const handleSelectProposal = useCallback(
    (proposalId: string | undefined) => {
      const proposal = proposalsJson.proposals.find(
        (p) => p.proposalId === proposalId,
      );
      setSelectedProposal(proposal);
      setSelectedProposalId(proposalId);
      setIsModalOpen(true);
    },
    [proposalsJson.proposals],
  );

  const handleActiveTabClick = () => {
    if (activeTabId !== "active") {
      setActiveTabId("active");
      // select the first proposal when the user clicks to view the
      // active tab
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        setDefaultActiveProposal();
      }
    }
  };

  const handlePastTabClick = () => {
    if (activeTabId !== "past") {
      setActiveTabId("past");
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        // select the first proposal when the user clicks to view the
        // past tab
        setDefaultPastProposal();
      }
    }
  };

  const handleOnClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Populates the default past/active proposal when moving from small -> big screen size
  useEffect(() => {
    if (isTailwindLargeScreen && !isModalOpen) {
      if (activeTabId === "past") {
        setDefaultPastProposal();
      } else {
        setDefaultActiveProposal();
      }
    }
  }, [
    activeTabId,
    isModalOpen,
    isTailwindLargeScreen,
    pastProposals,
    selectedProposal,
    setDefaultActiveProposal,
    setDefaultPastProposal,
  ]);

  const proposalDetail = !!selectedProposal ? (
    <ProposalDetailsCard
      key={selectedProposalId}
      onClose={handleOnClose}
      account={account}
      signer={signer}
      proposal={selectedProposal}
    />
  ) : null;

  const showNoProposalsState =
    (activeTabId === "active" && !activeProposals.length) ||
    (activeTabId === "past" && !pastProposals.length);

  return (
    <div className="flex h-full lg:justify-center">
      <div className="h-full w-full flex-1 space-y-8 pr-8 pt-8 lg:max-w-lg">
        <H1 className="flex-1 text-center text-principalRoyalBlue">{t`On-chain Proposals`}</H1>
        <div className="flex justify-between">
          <Tabs aria-label={t`Filter proposals`}>
            <Tab
              first
              current={activeTabId === "active"}
              onClick={handleActiveTabClick}
              name={t`Active`}
            />
            <Tab
              last
              current={activeTabId === "past"}
              onClick={handlePastTabClick}
              name={t`Past`}
            />
          </Tabs>
          <OffChainProposalsLink />
        </div>
        <div className="flex space-x-12">
          {showNoProposalsState ? (
            <NoProposalsList activeTabId={activeTabId} />
          ) : (
            <ProposalList
              account={account}
              signer={signer}
              proposals={
                activeTabId === "active" ? activeProposals : pastProposals
              }
              selectedProposalId={selectedProposalId}
              onClickItem={handleSelectProposal}
              isModalOpen={isModalOpen}
            />
          )}
        </div>
      </div>

      {showNoProposalsState ? <NoProposalsDetail /> : null}

      {isTailwindLargeScreen ? (
        proposalDetail
      ) : (
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog
            // Using z-50 so that the dialog appears above the Sidebar, which is currently set to z-10
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={handleOnClose}
          >
            <div className="fixed top-1/2 left-1/2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 sm:scale-95"
                enterTo="opacity-100 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 sm:scale-100"
                leaveTo="opacity-0 sm:scale-95"
              >
                {proposalDetail}
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
}

function OffChainProposalsLink() {
  return (
    <AnchorButton
      target="_blank"
      href={ELEMENT_FINANCE_SNAPSHOT_URL}
      variant={ButtonVariant.SECONDARY}
    >
      <div className="flex h-full items-center">
        <span className="mr-1">{t`Off-chain`}</span>
        <ExternalLinkIcon height={24} />
      </div>
    </AnchorButton>
  );
}

/**
 * To make sure we are only showing proposals that are deemed safe to vote on, we keep a curated
 * list of proposals hardcoded in the frontend.  The client grabs the snapshot information and we
 * link the on-chain proposal with the snapshot information.
 *
 * @param activeTabId
 * @param snapshotProposals
 * @returns
 */
function useFilteredProposals(
  activeTabId: TabId,
  proposals: Proposal[],
  currentBlockNumber: number,
): Proposal[] {
  return useMemo(() => {
    if (activeTabId === "active") {
      return proposals?.filter(
        (proposal) => proposal.expiration > currentBlockNumber,
      );
    }

    if (activeTabId === "past") {
      return proposals?.filter(
        (proposal) => proposal.expiration <= currentBlockNumber,
      );
    }

    return [];
  }, [activeTabId, currentBlockNumber, proposals]);
}

function NoProposalsList(props: { activeTabId: TabId }) {
  return (
    <div className="my-6 flex flex-1 flex-col items-center text-blueGrey">
      <EmptySpaceFace className="-mr-[27px] w-[90%] max-w-[327px]" />
      <p className="mt-4 text-xl font-semibold leading-6">{t`no ${props.activeTabId} proposals`}</p>
    </div>
  );
}

function NoProposalsDetail() {
  return (
    <GradientCard
      style={
        // don't scroll app behind popover, makes a double scroll bar
        { overscrollBehavior: "none" }
      }
      className="hidden h-[85vh] min-w-[403px] max-w-[48rem] flex-1 items-center justify-center rounded-xl opacity-90 lg:flex"
    >
      <H2 className="m-4 text-white">{t`Click on a proposal to view it here`}</H2>
    </GradientCard>
  );
}
