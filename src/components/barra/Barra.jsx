import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

export default function ScrollableTabsButtonForce(props) {
  const { page, changePage, clickEnCodigo } = props;
  const [value, setValue] = React.useState(page);

  const handleChange = async (event, newValue) => {
    await setValue(newValue);
    changePage(newValue);
  };

  const optenerScriptMesa = () => {
    clickEnCodigo();
  };
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
        <Tab
          label="Item Two"
          onClick={optenerScriptMesa}
          icon={<FavoriteIcon />}
          {...a11yProps(1)}
        />
        <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
      </Tabs>
    </AppBar>
  );
}
