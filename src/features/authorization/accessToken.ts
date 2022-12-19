const ACCESS_TOKEN_URI_PARTS = {
  host: "https://accounts.google.com/o/oauth2/v2/auth",
  type: "response_type=token",
  clientId:
    "client_id=1055530683437-2n4cde8v4humjd2rltaq0pgfl72kqdf6.apps.googleusercontent.com",
  redirectUrl: "redirect_uri=https%3A//taska.dimau.ru/access-token",
  scope:
    "scope=https%3A//www.googleapis.com/auth/tasks+https://www.googleapis.com/auth/userinfo.profile", // two scopes, one for google tasks and the second for profile name
};

export const ACCESS_TOKEN_URI = `${ACCESS_TOKEN_URI_PARTS.host}?${ACCESS_TOKEN_URI_PARTS.type}&${ACCESS_TOKEN_URI_PARTS.clientId}&${ACCESS_TOKEN_URI_PARTS.redirectUrl}&${ACCESS_TOKEN_URI_PARTS.scope}`;
