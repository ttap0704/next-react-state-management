describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const wrong_login_id = "test";
  const login_id = `test${new Date().getTime()}`;
  const test_id = "test12345";
  const wrong_password = "1234";
  const password = "123456789";

  it("1. 로그인", () => {
    cy.get("#input-login-id").type(wrong_login_id);
    cy.get("#input-login-password").type(wrong_password);
    cy.get("#login-button").click();

    cy.log("로그인 실패 팝업 생성");

    cy.get("#input-login-id").clear();
    cy.get("#input-login-password").clear();

    cy.get("#input-login-id").type("test12345");
    cy.get("#input-login-password").type("123456789");
    cy.get("#login-button").click();

    cy.log("로그인 완료 후, /todos 페이지로 이동");
  });

  it("2. 회원가입", () => {
    cy.get("a[href='/join']").click();

    cy.wait(1000);
    cy.get("#input-login-id").type(login_id);
    cy.get("#input-login-password").type(wrong_password);
    cy.get("#input-login-password-check").type(wrong_password);
    cy.get("#login-button").click();

    cy.log("회원가입 불가 팝업 생성");

    cy.get("#input-login-id").clear();
    cy.get("#input-login-password").clear();
    cy.get("#input-login-password-check").clear();

    cy.get("#input-login-id").type(login_id);
    cy.get("#input-login-password").type(password);
    cy.get("#input-login-password-check").type(password);
    cy.get("#login-button").click();

    cy.log("회원가입 완료 팝업 생성 후, /login 페이지로 이동");
  });

  it("3. Todo 사용", () => {
    cy.get("#input-login-id").type(test_id);
    cy.get("#input-login-password").type(password);
    cy.get("#login-button").click();
    cy.log("로그인 후, /todos 페이지로 이동");

    cy.get("#create-todo-button").click();
    cy.log("입력 요청 팝업 생성");

    cy.get("#input-todo-contents").type("책 읽기");
    cy.get("#create-todo-button").click();
    cy.log("Todo 등록완료 팝업 생성 및 리스트 추가");

    cy.get(".todo-list-delete-button:first").click();
    cy.log("삭제확인 팝업 및 삭제완료 팝업 생성");
  });

  it("4. 로그아웃", () => {
    cy.get("#input-login-id").type(test_id);
    cy.get("#input-login-password").type(password);
    cy.get("#login-button").click();
    cy.log("로그인 후, /todos 페이지로 이동");

    cy.get("#logout-button").click();
    cy.log("로그아웃 완료 후, /login 페이지로 이동");
  });
});
