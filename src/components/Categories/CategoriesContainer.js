import { withRouter } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { withFirebaseCollection, withFirebaseDocument } from '../HOC/Firebase';
import firebase from 'firebase';
import Categories from './Categories';

export default compose(
  withRouter,

  withNamespaces(),

  withStateHandlers(
    () => ({
      search: ''
    }),

    {
      onSearchChange: () => (e) => ({ search: e.target.value })
    }
  ),

  withFirebaseDocument(
    () => firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid),
    'user'
  ),

  withFirebaseCollection(
    () => firebase.firestore().collection('categories'),
    'categories'
  ),

  withHandlers({
    onCategoryPress: ({ history }) => (e, c) => {
      e.preventDefault();

      history.push(`/categories/${c.id}`);
    }
  })
)(Categories);
