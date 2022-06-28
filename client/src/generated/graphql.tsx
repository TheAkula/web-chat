import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Chat = {
  __typename?: "Chat";
  id: Scalars["String"];
  messages: Array<Message>;
  name: Scalars["String"];
  users: Array<User>;
};

export type Message = {
  __typename?: "Message";
  author: User;
  chat: Chat;
  content: Scalars["String"];
  date: Scalars["DateTime"];
  id: Scalars["String"];
  isRead: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  signUp: User;
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user: User;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  chats: Array<Chat>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["String"];
  isActive: Scalars["Boolean"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  salt: Scalars["String"];
};

export type SignUpMutationVariables = Exact<{
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
  };
};

export const SignUpDocument = gql`
  mutation signUp(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      password: $password
      email: $email
    ) {
      id
      firstName
      lastName
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
