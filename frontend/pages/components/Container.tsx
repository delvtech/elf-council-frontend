import React, { ReactElement } from "react";
import { request, gql } from "graphql-request";
import DescriptionIcon from "@material-ui/icons/Description";
import GavelIcon from "@material-ui/icons/Gavel";
import GradeIcon from "@material-ui/icons/Grade";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Card from "components/Card";
import Middle from "components/Middle";
import RightBar from "components/RightBar";
import tw from "elf-tailwindcss-classnames";
import { t } from "ttag";
import { useQuery } from "react-query";

const iconStyle = tw("text-white", "text-xs");

export function Container(): ReactElement {
  const { data } = useProposals();
  console.log("data", data);

  return (
    <div
      className={tw(
        "bg-gradient-to-r",
        "from-gray-100",
        "to-gray-50",
        "h-full"
      )}
    >
      <div className={tw("px-8", "py-1")}>
        <p
          className={tw(
            "text-blue-400",
            "font-bold",
            "text-2xl",
            "transform-gpu",
            "-translate-y-2"
          )}
        >
          {t`Governance Overview`}
        </p>
      </div>
      <div className={tw("flex", "p-4", "space-x-3")}>
        <Card
          title="VOTES DELEGATED"
          balance={6000}
          icon={
            <GavelIcon key="gavel" fontSize="small" className={iconStyle} />
          }
        />
        <Card
          title="TOTAL GOVERNANCE REWARDS"
          balance={400.079}
          icon={
            <GradeIcon key="grade" fontSize="small" className={iconStyle} />
          }
        />
        <Card
          title="PROPOSALS"
          balance={100}
          icon={
            <DescriptionIcon
              key="description"
              fontSize="small"
              className={iconStyle}
            />
          }
        />
        <Card
          title="GOVERNANCE TOKENS CIRCULATING"
          balance={790}
          icon={
            <MonetizationOnIcon
              key="monetization"
              fontSize="small"
              className={iconStyle}
            />
          }
        />
      </div>
      <div className={tw("flex", "ml-3", "mt-6", "space-x-6", "mr-4")}>
        <Middle />
        <RightBar />
      </div>
    </div>
  );
}

export default Container;
function useProposals() {
  return useQuery(["proposals"], async () => {
    const { proposals } = await request(
      endpoint,
      gql`
        query {
          proposals(
            first: 20
            skip: 0
            # where: { space_in: ["balancer", "yam.eth"], state: "closed" }
            orderBy: "created"
            orderDirection: desc
          ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
              id
              name
            }
          }
        }
      `
    );

    return proposals;
  });
}

const endpoint = "https://hub.snapshot.org/graphql";
