import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "../styles/App.css";
import { SearchTypes } from "../types";
import { CompareSearch } from "./ComparableSearchField";
import { SingleSourceSearchField } from "./SingleSourceSearchField";
import APIClient from "../services/apiClient";

const classNames = require("classnames");

const Search: React.FC = () => {
  const [activeSearchField, setActiveSearchField] = useState(
    SearchTypes.singleSource
  );
  const [availableEndpoints, setAvailableEndpoints] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const api = new APIClient();
      const res = await api.get("/available_endpoints");
      setAvailableEndpoints(res);
    })();
  }, []);

  return (
    <div className="search__container">
      <div className="search_screen">
        <Grid fluid>
          <Row>
            <Col style={{ textAlign: "center" }} lg={12}>
              <h2>Answer questions about social issues without bias.</h2>
              <h4>For free.</h4>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <ul className="searchToggle__controller">
                <li
                  onClick={() => setActiveSearchField(SearchTypes.singleSource)}
                  className={classNames({
                    active__search:
                      activeSearchField === SearchTypes.singleSource,
                  })}
                >
                  Browse available data
                </li>
                <li
                  onClick={() =>
                    setActiveSearchField(SearchTypes.compareSources)
                  }
                  className={classNames({
                    active__search:
                      activeSearchField === SearchTypes.compareSources,
                  })}
                >
                  Compare two data sources
                </li>
              </ul>
            </Col>

            {activeSearchField === SearchTypes.compareSources && (
              <CompareSearch />
            )}
            {activeSearchField === SearchTypes.singleSource && (
              <SingleSourceSearchField sources={availableEndpoints} />
            )}
          </Row>
        </Grid>
      </div>
    </div>
  );
};

export default Search;
