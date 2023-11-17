import './app.css';

import type { FC } from 'react';

const App: FC = () => {

  return (
    <>
      <div className="container">
      <div className="form-container">
        <div className="form-box">
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>
          <p>New to us? <a  className='form-link' href="#">Register</a></p>
        </div>
        <div className="form-box">
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <a className='form-link' href="#">Sign in</a></p>
        </div>
      </div>
    </div>
    </>
  );
};

export { App };
