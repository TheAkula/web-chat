import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Auth = {
  __typename?: 'Auth';
  userToken: Scalars['String'];
};

export type Chat = {
  __typename?: 'Chat';
  chatsGroup: ChatsGroup;
  id: Scalars['String'];
  messages: Array<MessageLink>;
  name: Scalars['String'];
  users: Array<UserLink>;
};

export type ChatLink = {
  __typename?: 'ChatLink';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ChatsGroup = {
  __typename?: 'ChatsGroup';
  chats: Array<ChatLink>;
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  users: Array<UserLink>;
};

export type ChatsGroupLink = {
  __typename?: 'ChatsGroupLink';
  id: Scalars['String'];
  imgUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  author: UserLink;
  chat: ChatLink;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MessageLink = {
  __typename?: 'MessageLink';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createChatsGroup: ChatsGroup;
  createMessage: Message;
  login: Auth;
  signUp: User;
};


export type MutationCreateChatArgs = {
  chatsGroupId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateChatsGroupArgs = {
  imgUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  chatId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  chatsGroup: ChatsGroup;
  messages: Array<Message>;
  myChatsGroups: Array<ChatsGroup>;
  myUserInfo: User;
  user: User;
};


export type QueryChatsArgs = {
  id: Scalars['String'];
};


export type QueryChatsGroupArgs = {
  id: Scalars['String'];
};


export type QueryMessagesArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatCreated: Chat;
  chatsGroupCreated: ChatsGroup;
  messageCreated?: Maybe<Message>;
};


export type SubscriptionChatCreatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionChatsGroupCreatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionMessageCreatedArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  chats: Array<ChatLink>;
  chatsGroups: Array<ChatsGroupLink>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  userToken?: Maybe<Scalars['String']>;
};

export type UserLink = {
  __typename?: 'UserLink';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
};

export type ChatCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ChatCreatedSubscription = { __typename?: 'Subscription', chatCreated: { __typename?: 'Chat', id: string, name: string } };

export type ChatsGroupCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ChatsGroupCreatedSubscription = { __typename?: 'Subscription', chatsGroupCreated: { __typename?: 'ChatsGroup', id: string, name: string, imgUrl?: string | null, users: Array<{ __typename?: 'UserLink', id: string, email: string }> } };

export type CreateChatMutationVariables = Exact<{
  name: Scalars['String'];
  chatsGroupId: Scalars['String'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name: string } };

export type CreateChatsGroupMutationVariables = Exact<{
  name: Scalars['String'];
  imgUrl?: InputMaybe<Scalars['String']>;
}>;


export type CreateChatsGroupMutation = { __typename?: 'Mutation', createChatsGroup: { __typename?: 'ChatsGroup', id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', userToken: string } };

export type MessageCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MessageCreatedSubscription = { __typename?: 'Subscription', messageCreated?: { __typename?: 'Message', id: string, content: string, updatedAt: any, author: { __typename?: 'UserLink', id: string, firstName: string, lastName: string } } | null };

export type MessagesQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, content: string, updatedAt: any, author: { __typename?: 'UserLink', id: string, firstName: string, lastName: string } }> };

export type MyChatsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MyChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, name: string }> };

export type MyChatsGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyChatsGroupsQuery = { __typename?: 'Query', myChatsGroups: Array<{ __typename?: 'ChatsGroup', id: string, name: string, imgUrl?: string | null }> };

export type MyUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type MyUserInfoQuery = { __typename?: 'Query', myUserInfo: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } };

export type SignUpMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, firstName: string, lastName: string, userToken?: string | null, email: string } };


export const ChatCreatedDocument = gql`
    subscription chatCreated($userId: String!) {
  chatCreated(userId: $userId) {
    id
    name
  }
}
    `;

/**
 * __useChatCreatedSubscription__
 *
 * To run a query within a React component, call `useChatCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatCreatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChatCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatCreatedSubscription, ChatCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatCreatedSubscription, ChatCreatedSubscriptionVariables>(ChatCreatedDocument, options);
      }
export type ChatCreatedSubscriptionHookResult = ReturnType<typeof useChatCreatedSubscription>;
export type ChatCreatedSubscriptionResult = Apollo.SubscriptionResult<ChatCreatedSubscription>;
export const ChatsGroupCreatedDocument = gql`
    subscription chatsGroupCreated($userId: String!) {
  chatsGroupCreated(userId: $userId) {
    id
    name
    imgUrl
    users {
      id
      email
    }
  }
}
    `;

/**
 * __useChatsGroupCreatedSubscription__
 *
 * To run a query within a React component, call `useChatsGroupCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatsGroupCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsGroupCreatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChatsGroupCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ChatsGroupCreatedSubscription, ChatsGroupCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ChatsGroupCreatedSubscription, ChatsGroupCreatedSubscriptionVariables>(ChatsGroupCreatedDocument, options);
      }
export type ChatsGroupCreatedSubscriptionHookResult = ReturnType<typeof useChatsGroupCreatedSubscription>;
export type ChatsGroupCreatedSubscriptionResult = Apollo.SubscriptionResult<ChatsGroupCreatedSubscription>;
export const CreateChatDocument = gql`
    mutation createChat($name: String!, $chatsGroupId: String!) {
  createChat(name: $name, chatsGroupId: $chatsGroupId) {
    id
    name
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      chatsGroupId: // value for 'chatsGroupId'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const CreateChatsGroupDocument = gql`
    mutation CreateChatsGroup($name: String!, $imgUrl: String) {
  createChatsGroup(name: $name, imgUrl: $imgUrl) {
    id
  }
}
    `;
export type CreateChatsGroupMutationFn = Apollo.MutationFunction<CreateChatsGroupMutation, CreateChatsGroupMutationVariables>;

/**
 * __useCreateChatsGroupMutation__
 *
 * To run a mutation, you first call `useCreateChatsGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatsGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatsGroupMutation, { data, loading, error }] = useCreateChatsGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      imgUrl: // value for 'imgUrl'
 *   },
 * });
 */
export function useCreateChatsGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatsGroupMutation, CreateChatsGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatsGroupMutation, CreateChatsGroupMutationVariables>(CreateChatsGroupDocument, options);
      }
export type CreateChatsGroupMutationHookResult = ReturnType<typeof useCreateChatsGroupMutation>;
export type CreateChatsGroupMutationResult = Apollo.MutationResult<CreateChatsGroupMutation>;
export type CreateChatsGroupMutationOptions = Apollo.BaseMutationOptions<CreateChatsGroupMutation, CreateChatsGroupMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MessageCreatedDocument = gql`
    subscription messageCreated($userId: String!) {
  messageCreated(userId: $userId) {
    id
    author {
      id
      firstName
      lastName
    }
    content
    updatedAt
  }
}
    `;

/**
 * __useMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageCreatedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMessageCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>(MessageCreatedDocument, options);
      }
export type MessageCreatedSubscriptionHookResult = ReturnType<typeof useMessageCreatedSubscription>;
export type MessageCreatedSubscriptionResult = Apollo.SubscriptionResult<MessageCreatedSubscription>;
export const MessagesDocument = gql`
    query messages($id: String!) {
  messages(id: $id) {
    id
    author {
      id
      firstName
      lastName
    }
    content
    updatedAt
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MyChatsDocument = gql`
    query myChats($id: String!) {
  chats(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useMyChatsQuery__
 *
 * To run a query within a React component, call `useMyChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyChatsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMyChatsQuery(baseOptions: Apollo.QueryHookOptions<MyChatsQuery, MyChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, options);
      }
export function useMyChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyChatsQuery, MyChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, options);
        }
export type MyChatsQueryHookResult = ReturnType<typeof useMyChatsQuery>;
export type MyChatsLazyQueryHookResult = ReturnType<typeof useMyChatsLazyQuery>;
export type MyChatsQueryResult = Apollo.QueryResult<MyChatsQuery, MyChatsQueryVariables>;
export const MyChatsGroupsDocument = gql`
    query myChatsGroups {
  myChatsGroups {
    id
    name
    imgUrl
  }
}
    `;

/**
 * __useMyChatsGroupsQuery__
 *
 * To run a query within a React component, call `useMyChatsGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyChatsGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyChatsGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyChatsGroupsQuery(baseOptions?: Apollo.QueryHookOptions<MyChatsGroupsQuery, MyChatsGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyChatsGroupsQuery, MyChatsGroupsQueryVariables>(MyChatsGroupsDocument, options);
      }
export function useMyChatsGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyChatsGroupsQuery, MyChatsGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyChatsGroupsQuery, MyChatsGroupsQueryVariables>(MyChatsGroupsDocument, options);
        }
export type MyChatsGroupsQueryHookResult = ReturnType<typeof useMyChatsGroupsQuery>;
export type MyChatsGroupsLazyQueryHookResult = ReturnType<typeof useMyChatsGroupsLazyQuery>;
export type MyChatsGroupsQueryResult = Apollo.QueryResult<MyChatsGroupsQuery, MyChatsGroupsQueryVariables>;
export const MyUserInfoDocument = gql`
    query myUserInfo {
  myUserInfo {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMyUserInfoQuery__
 *
 * To run a query within a React component, call `useMyUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(MyUserInfoDocument, options);
      }
export function useMyUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyUserInfoQuery, MyUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyUserInfoQuery, MyUserInfoQueryVariables>(MyUserInfoDocument, options);
        }
export type MyUserInfoQueryHookResult = ReturnType<typeof useMyUserInfoQuery>;
export type MyUserInfoLazyQueryHookResult = ReturnType<typeof useMyUserInfoLazyQuery>;
export type MyUserInfoQueryResult = Apollo.QueryResult<MyUserInfoQuery, MyUserInfoQueryVariables>;
export const SignUpDocument = gql`
    mutation signUp($firstName: String!, $lastName: String!, $password: String!, $email: String!) {
  signUp(
    firstName: $firstName
    lastName: $lastName
    password: $password
    email: $email
  ) {
    id
    firstName
    lastName
    userToken
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;