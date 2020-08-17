import React from "react";
import { Row, Col } from "react-flexbox-grid";
import { Listing } from "./Listing";

interface ISource {
  uid: string;
  name: string;
  endpoint: string;
  description: string;
  source: string;
}
export const SingleSourceSearchField: React.FC<{
  sources: Array<ISource>;
}> = ({ sources }) => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <ul className="availableSources__list">
          <Row style={{ width: "100%" }}>
            {sources.map((src: ISource) => {
              return (
                <Col lg={4} md={4} sm={6} xs={12} key={src.uid}>
                  <Listing
                    uid={src.uid}
                    endpoint={src.endpoint}
                    value={src.name}
                    expand={true}
                    description={src.description}
                    dataSource={src.source}
                  />
                </Col>
              );
            })}
          </Row>
        </ul>
      </Col>
    </React.Fragment>
  );
};
