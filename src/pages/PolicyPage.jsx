import Header from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

export const PolicyPage = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <div className="min-h-screen">
        <h1 className="ml-0 pl-0 text-lg font-bold mt-32 mb-4">이용 약관</h1>
        <ul className="space-y-4">
          <li>
            제 1조 (목적)
            <p>
              본 약관은 데브랩(이하 "회사")이 제공하는 데브랩 및 데브랩 관련 제반 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </li>
          <li>
            개인정보 수집 방법
            <ol className="list-decimal">
              <li>
                아이디, 닉네임, 비밀번호 : 회원가입 시 필수 항목 기재 요청
              </li>
              <li>
                이메일 : 쿠키(쿠키는 해당 브라우저 또는 기기 등에서 수집하는 것으로 회사가 수집하는 것이 아님)
              </li>
              <li>
                소셜 계정 유저 식별 값 : 소셜 계정으로 최초 로그인
              </li>
            </ol>
          </li>
          <li>
            개인정보 수집 목적
            <ol className="list-decimal">
              <li>
                아이디, 닉네임, 비밀번호 : 회원 가입 시 중복 가입 방지 확인 및 서비스 이용
              </li>
              <li>
                이메일 : 보안코드 발송을 위한 이메일 전송
              </li>
              <li>
                소셜 계정 유저 식별 값 : 중복 가입 방지 확인 및 서비스 이용
              </li>
            </ol>
          </li>
          <li>
            개인정보 공유, 제공 및 위탁
            <ol className="list-decimal">
              <li>
                회원의 동의가 있거나 법률의 규정 또는 수사목적으로 법령에 정해진 절차와 방법에 따른 수사기관의 요구에 의한 경우를 제외하고, 어떠한 경우에도 이용자의 개인정보를 이용하거나 외부에 공개하지 않습니다.
              </li>
            </ol>
          </li>
          <li>
            개인정보의 보유 및 이용기간
            <ol className="list-decimal">
              <li>
                탈퇴 시 모든 개인정보 즉시 파기하며 보관하지 않습니다.
              </li>
            </ol>
          </li>
          <li>
            개인정보 파기 방법
            <ol className="list-decimal">
              <li>
                기록을 재생할 수 없는 방법을 사용하여 삭제
              </li>
            </ol>
          </li>
          <li>
            쿠키의 설치, 운영 및 거부
            <ol className="list-decimal">
              <li>
                쿠키의 사용 목적 : 쿠키는 보안코드 발급 시 이메일 발송을 위해 사용됩니다.
              </li>
              <li>
                쿠키 삭제 및 거부 : 웹 브라우저 설정을 통해 삭제 및 거부 할 수 있습니다.
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <Footer/>
    </>
  );
};
