/**
 * Login Wrapper.
 * @module components/LoginForm/LoginForm
 */
import React, { ReactNode } from 'react';
import { Helmet } from '@plone/volto/helpers/Helmet/Helmet';
import { Container } from '@plone/components';

import './LoginForm.scss';

interface LoginFormProps {
  children: ReactNode;
  title: string;
  description: string;
}

/**
 * LoginForm component.
 * @function LoginForm
 * @returns {JSX.Element} Login layout.
 */
function LoginForm({
  children,
  title,
  description,
}: LoginFormProps): JSX.Element {
  return (
    <div id="page-login">
      <Helmet title={title} />
      <Container className="loginForm">
        <Container className="wrapper">
          <Container className="title">{title}</Container>
          <Container className="description">{description}</Container>
          <Container className="form">{children}</Container>
        </Container>
      </Container>
    </div>
  );
}

export default LoginForm;
