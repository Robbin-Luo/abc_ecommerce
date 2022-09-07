import Cookie from 'js-cookie';

export const setCookie=(authCookie, usrin)=>{
  Cookie.set(authCookie, usrin, {
    secure:true, sameSite:'strict', path:'/'
  })
}

export const getCookie=(authCookie)=>{
  return Cookie.get(authCookie);
}

export const removeCookie=(authCookie)=>{
  return Cookie.remove(authCookie);
}