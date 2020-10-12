/*
 * ErrorPop Messages
 *
 * This contains all the text for the ErrorPop component.
 */

import { defineMessages } from "react-intl";

export const scope = "app.components.ErrorPop";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ErrorPop component!"
  },

  500101: {
    id: `${scope}.500101`,
    defaultMessage: "아이디는 필수 입력값 입니다."
  },
  500102: {
    id: `${scope}.500102`,
    defaultMessage: "이미 사용중인 아이디 입니다."
  },
  500103: {
    id: `${scope}.500103`,
    defaultMessage: "비밀번호는 필수 입력값 입니다."
  },
  500104: {
    id: `${scope}.500104`,
    defaultMessage:
      "비밀번호는 영소문자, 영대문자, 숫자를 반드시 포함한 8~25자리를 입력해 주세요."
  },
  500200: {
    id: `${scope}.500200`,
    defaultMessage:
      "해당 관리자를 찾을 수 없습니다."
  }
});
