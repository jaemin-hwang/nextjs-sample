import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

export const accessTokenName = "accessTokenJaemin";
let accessToken = "";

export const login = ({ token }) => {
  cookie.set(accessTokenName, token, { expires: 10 });
  window.localStorage.setItem(accessTokenName, token);

  Router.push("/");
};

export const getAccessToken = () => {
  return accessToken;
};

export const setAccessToken = token => {
  accessToken = token;
};

export const auth = ctx => {
  const { accessTokenJaemin } = nextCookie(ctx);
  // console.log("]-----] auth.token [----[ ", accessTokenJaemin);
  const token = accessTokenJaemin;

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/signin" });
    ctx.res.end();
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push("/signin");
  }

  return token;
};

export const logout = () => {
  // console.log("]-----] auth.logout.cookie [----[ ", cookie);
  cookie.remove(accessTokenName);
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  window.localStorage.removeItem(accessTokenName);
  Router.push("/signin");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/signin");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, [null]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ({ ctx }) => {
    // const { store, isServer, req } = ctx;
    const token = auth(ctx);
    // console.log("]-----] auth.token [----[ ", token);
    // store.dispatch(isSignin(token));
    // setAccessToken(token);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
