import { connect } from "react-redux";
import NavBar from "./NavBar";
import { compose } from "redux";
import { mobileSideBarActiveSucces } from '../../redux/app-reducer';

let mapStateToProps = (state) => {
  return {
    friends: state.sidebarItems.friends
  };
};

export default compose(connect(mapStateToProps, { mobileSideBarActiveSucces }))(NavBar);