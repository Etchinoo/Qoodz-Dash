import { Logo } from "../../pages/Auth/Signin/Signin.styles";
import logo from "../../assets/logo.png";
import {
  Container,
  Header,
  NavMenue,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLogo,
  SSidebar,
  SSidebarButton,
} from "./Navbar.styles";

import NAV_DAT from "../../data/nav_data.json";
import NavItem from "./components/NavItem";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import {
  BranchesIcon,
  CampaignesIcon,
  CashiersIcon,
  CustomersIcon,
  HomeIcon,
  OffersIcon,
  PartnershipsIcon,
  SettingsIcon,
} from "./NavIcons";
import { useLocation } from "react-router-dom";

const matchTable = {
  Home: <HomeIcon />,
  Customers: <CustomersIcon />,
  Cashires: <CashiersIcon />,
  Branches: <BranchesIcon />,
  Offers: <OffersIcon />,
  Campaignes: <CampaignesIcon />,
  Partnerships: <PartnershipsIcon />,
  Settings: <SettingsIcon />,
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(sidebarOpen);
  }, [sidebarOpen]);

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((p) => !p)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <Header>
        <SLogo>
          <img src={logo} alt="logo"/>
        </SLogo>
      </Header>

      {NAV_DAT.map((nav) => (
        <SLinkContainer key={nav.id} isActive={pathname === nav.path}>
          <SLink
            to={nav.path}
            style={
              sidebarOpen
                ? {
                    width: `fit-content`,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }
                : {}
            }
          >
            <SLinkIcon>{matchTable[nav.name]}</SLinkIcon>
            {sidebarOpen && (
              <SLinkLabel isOpen={sidebarOpen}>{nav.name}</SLinkLabel>
            )}
          </SLink>
        </SLinkContainer>
      ))}

      {/* 
      <NavMenue>
        {NAV_DAT.map((nav) => (
          <NavItem to={nav.path} key={nav.id} name={nav.name} icon={nav.icon} />
        ))}
      </NavMenue> */}
    </SSidebar>
  );
};

export default Navbar;
