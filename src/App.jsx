import { Routes, Route } from "react-router-dom";
import Job from './components/Job/Job';
import ChessBoard from './components/ChessBoard/ChessBoard';

const App = () => {
  return (
    <main className="">
      <Routes>
        <Route path='/' element={<Job />} />
        <Route path='/chessboard' element={<ChessBoard />} />
      </Routes>
    </main>
  )
}

export default App