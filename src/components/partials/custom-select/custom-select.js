import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import history from "../../../root/root.history";

import { resetSearch } from "./../../../helpers/get-data";

import "./custom-select.css";

const SEARCH_OPTIONS = [
  { name: "All", translateKey: "SEARCH.ALL", path: "home" },
  { name: "Boardings", translateKey: "NAVIGATION.BOARDINGS", path: "boardings/null" },
  { name: "Vessels", translateKey: "NAVIGATION.VESSELS", path: "vessels/null" },
  { name: "Crew", translateKey: "NAVIGATION.CREW", path: "crew/null" },
  { name: "Users", translateKey: "NAVIGATION.USERS", path: "users" },
  { name: "Agencies", translateKey: "NAVIGATION.AGENCIES", path: "agencies" },
  { name: "Reports", translateKey: "SEARCH.REPORTS", path: "reports" },
];

class CustomSelect extends Component {
  state = {
    selected: "",
    showOptionsList: false,
  };

  setSelected = (option) => {
    const newPath = !option ? "home" : option.toLowerCase();
    history.push(`/${newPath}`);

    resetSearch();

    this.setState({ selected: option });
  };

  componentDidMount() {
    const currPath = this.props.match.path.match(/[a-zA-Z]+/g)[0];
    const currPathWithCase = currPath.charAt(0).toUpperCase() + currPath.slice(1)
    this.setState({
      selected: SEARCH_OPTIONS.find( ({ name }) => name === currPathWithCase ) ? currPathWithCase: "All",
});
  }

  render() {
    const { selected, showOptionsList } = this.state;
    const { t } = this.props;

    return (
      <div className="flex-row relative select-menu">
        <div
          className="flex-row align-center full-view selected-item"
          onClick={() => this.setState({ showOptionsList: !showOptionsList })}
        >
          <div className="capitalize">{selected}</div>
          <div className="arrow">
            <img
              className="icon"
              src={require("../../../assets/filled-arrow.svg").default}
              alt="Use/Change this filter"
            />
          </div>
        </div>
        {showOptionsList && (
          <div className="flex-column white-bg box-shadow absolute options-list">
            {SEARCH_OPTIONS.map((option, key) => (
              <div
                className="option"
                key={key}
                onClick={() => this.setSelected(option.path)}
              >
                {t(option.translateKey)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation("translation")(withRouter(CustomSelect));
