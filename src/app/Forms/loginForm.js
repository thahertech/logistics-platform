import { useEffect } from 'react';
import $ from 'jquery';

const LoginForm = () => {
  useEffect(() => {
    const loginform = $('#loginform');
    const googlelink = $('p.galogin');
    const poweredby = $('p.galogin-powered');

    loginform.prepend("<h3 class='galogin-or'>or</h3>");

    if (poweredby.length) {
      loginform.prepend(poweredby);
    }
    loginform.prepend(googlelink);
  }, []);

  return (
    <form name="loginform" id="loginform" action="https://hbhzgaijh5znytz8e5wbqkpo0.js.wpenginepowered.com/wp-login.php" method="post">
      <p className="galogin" style={{ cursor: 'pointer', background: 'none', boxShadow: 'none' }}>
        <a href="?error=ga_needs_configuring">
          <span className="google-apps-header dark-pressed light">
            <span className="inner">
              <span className="icon dark-pressed light"></span>
              <span style={{ marginLeft: '10px' }}>Sign in with Google</span>
            </span>
          </span>
        </a>
      </p>

      <p className="forgetmenot">
        <input name="rememberme" type="checkbox" id="rememberme" value="forever" />
        <label htmlFor="rememberme">Remember Me</label>
      </p>
      <p className="submit">
        <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary button-large" value="Log In" />
        <input type="hidden" name="redirect_to" value="https://hbhzgaijh5znytz8e5wbqkpo0.js.wpenginepowered.com/wp-admin/" />
        <input type="hidden" name="testcookie" value="1" />
      </p>
    </form>
  );
};

export default LoginForm;
