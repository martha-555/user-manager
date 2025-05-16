/** @format */

import UserProvider from './context/UserProvider'
import UserList from './pages/UserList'

function App() {
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  )
}

export default App
