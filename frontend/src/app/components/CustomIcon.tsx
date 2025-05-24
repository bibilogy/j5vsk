import React from "react";
import Biology from "./Icons/Biology";
import Chemistry from "./Icons/Chemistry";
import ComputerScience from "./Icons/ComputerScience";
import Culture from "./Icons/Culture";
import Design from "./Icons/Design";
import Engineering from "./Icons/Enginnering";
import Essential from "./Icons/Essential";
import FineArts from "./Icons/FineArts";
import Geography from "./Icons/Geography";
import Graphic from "./Icons/Graphic";
import History from "./Icons/History";
import HistoryAndSocial from "./Icons/HistoryAndSocial";
import LiteratureIcon from "./Icons/Literature";
import MathIcon from "./Icons/Math";
import MusicIcon from "./Icons/Music";
import PhysicsIcon from "./Icons/Physics";
import Project from "./Icons/Project";
import Public from "./Icons/Public";
import Social from "./Icons/Social";
import Sports from "./Icons/Sports";
import Talk from "./Icons/Talk";
import TalkAndRead from "./Icons/TalkAndRead";
import Theater from "./Icons/Theater";
import ShopSignIcon from "./Icons/ShopSignIcon";
import { CustomIconProps } from "../lib/types";

const CustomIcon: React.FC<CustomIconProps> = ({ icon, size = 200 }) => {
  switch (icon) {
    case "biology":
      return <Biology size={size} />;
    case "chemistry":
      return <Chemistry size={size} />;
    case "computer-science":
      return <ComputerScience size={size} />;
    case "culture":
      return <Culture size={size} />;
    case "design":
      return <Design size={size} />;
    case "engineering":
      return <Engineering size={size} />;
    case "essential":
      return <Essential size={size} />;
    case "fine-arts":
      return <FineArts size={size} />;
    case "geography":
      return <Geography size={size} />;
    case "graphic":
      return <Graphic size={size} />;
    case "history":
      return <History size={size} />;
    case "history-and-social":
      return <HistoryAndSocial size={size} />;
    case "literature":
      return <LiteratureIcon size={size} />;
    case "math":
      return <MathIcon size={size} />;
    case "music":
      return <MusicIcon size={size} />;
    case "physics":
      return <PhysicsIcon size={size} />;
    case "project":
      return <Project size={size} />;
    case "public":
      return <Public size={size} />;
    case "social":
      return <Social size={size} />;
    case "sports":
      return <Sports size={size} />;
    case "talk-and-literature":
      return <TalkAndRead size={size} />;
    case "talk":
      return <Talk size={size} />;
    case "theater":
      return <Theater size={size} />;
    case "shop-sign":
      return <ShopSignIcon size={size} />;
    default:
      return null;
  }
};

export default CustomIcon;
