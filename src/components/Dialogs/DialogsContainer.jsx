import { addMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
	return {
		dialogData: state.dialog
	};
};

export default compose(
	connect(mapStateToProps, { addMessage }),
	withAuthRedirect
)(Dialogs);
