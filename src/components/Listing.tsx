import React from "react";
import { decamelize } from "../helpers";
import { Link } from "react-router-dom";
import { Text, Helper } from "../styles/Typography";
const classNames = require("classnames");

interface listing {
  uid: string | number;
  endpoint: string;
  value: string;
  link?: string;
  src?: string;
  active?: boolean;
  decamelize?: boolean;
  expand?: true;
  description?: string;
  dataSource?: string;
  pairedDown?: boolean;
}

export const Listing: React.FC<listing> = (props) => {
  const url = props.src
    ? `/dashboard/${props.src}/single/${props.endpoint}`
    : `/dashboard/${props.endpoint}/single`;

  const displayValue = props.decamelize ? decamelize(props.value) : props.value;
  return (
    <Link
      className={classNames({
        listing: true,
        invisibleLink: true,
        active: props.active,
        expanded: props.expand,
        pairedDown: props.pairedDown,
      })}
      to={url}
    >
      <div className="title">
        <Text size="lg" len="short">
          {displayValue}
        </Text>
      </div>

      {props.expand && (
        <div className="expanded">
          <Text size="sm" len="long">
            {props.description}
          </Text>
          <Helper>
            <strong>Source: </strong> {props.dataSource}
          </Helper>
        </div>
      )}
    </Link>
  );
};
