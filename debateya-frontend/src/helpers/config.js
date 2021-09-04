const port = 4000;
const backend = `http://localhost:${port}`;

export const urls = {
  url_signup: `${backend}/api/user/method/signup`,
  url_signin: `${backend}/api/user/method/signin`,
  url_questions: `${backend}/api/question`,
  url_get_number_changes_voter: `${backend}/api/question/method/find`,
  url_chat_list: `${backend}/api/chat`,
  url_dashboard: `${backend}/api/dashboard`,
  url_profile_update: `${backend}/api/user/method/update`,
  url_create_question: `${backend}/api/question/method/add`,
  url_send_voter: `${backend}/api/question/method/update/addvoter`,
  url_signout: `${backend}/api/signout`,
};
