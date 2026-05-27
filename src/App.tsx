/**
 * Main Application Component (App.tsx)
 * 
 * ? Acts as the primary entry point shell for the React tree.
 * ? Wraps the AppRouter which orchestrates all authenticated/unauthenticated routes.
 */

import AppRouter from './router/AppRouter';

function App(): React.ReactElement {
  return <AppRouter />;
}

export default App;
