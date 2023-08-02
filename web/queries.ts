/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHighlight = /* GraphQL */ `
  query GetHighlight($id: ID!) {
    getHighlight(id: $id) {
      id
      xpath
      data
      color
      domain
      time
      topic
      htmlMarkup
      user {
        id
        settings {
          id
          colors
          topics
          createdAt
          updatedAt
          settingsUserId
          __typename
        }
        active {
          id
          topic
          color
          pen
          background
          underline
          createdAt
          updatedAt
          activeUserId
          __typename
        }
        highlights {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userSettingsId
        userActiveId
        __typename
      }
      createdAt
      updatedAt
      userHighlightsId
      __typename
    }
  }
`;
export const listHighlights = /* GraphQL */ `
  query ListHighlights(
    $filter: ModelHighlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        xpath
        data
        color
        domain
        time
        topic
        htmlMarkup
        user {
          id
          createdAt
          updatedAt
          userSettingsId
          userActiveId
          __typename
        }
        createdAt
        updatedAt
        userHighlightsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      settings {
        id
        colors
        topics
        user {
          id
          createdAt
          updatedAt
          userSettingsId
          userActiveId
          __typename
        }
        createdAt
        updatedAt
        settingsUserId
        __typename
      }
      active {
        id
        topic
        color
        pen
        background
        underline
        user {
          id
          createdAt
          updatedAt
          userSettingsId
          userActiveId
          __typename
        }
        createdAt
        updatedAt
        activeUserId
        __typename
      }
      highlights {
        items {
          id
          xpath
          data
          color
          domain
          time
          topic
          htmlMarkup
          createdAt
          updatedAt
          userHighlightsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userSettingsId
      userActiveId
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        settings {
          id
          colors
          topics
          createdAt
          updatedAt
          settingsUserId
          __typename
        }
        active {
          id
          topic
          color
          pen
          background
          underline
          createdAt
          updatedAt
          activeUserId
          __typename
        }
        highlights {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userSettingsId
        userActiveId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getActive = /* GraphQL */ `
  query GetActive($id: ID!) {
    getActive(id: $id) {
      id
      topic
      color
      pen
      background
      underline
      user {
        id
        settings {
          id
          colors
          topics
          createdAt
          updatedAt
          settingsUserId
          __typename
        }
        active {
          id
          topic
          color
          pen
          background
          underline
          createdAt
          updatedAt
          activeUserId
          __typename
        }
        highlights {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userSettingsId
        userActiveId
        __typename
      }
      createdAt
      updatedAt
      activeUserId
      __typename
    }
  }
`;
export const listActives = /* GraphQL */ `
  query ListActives(
    $filter: ModelActiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        topic
        color
        pen
        background
        underline
        user {
          id
          createdAt
          updatedAt
          userSettingsId
          userActiveId
          __typename
        }
        createdAt
        updatedAt
        activeUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSettings = /* GraphQL */ `
  query GetSettings($id: ID!) {
    getSettings(id: $id) {
      id
      colors
      topics
      user {
        id
        settings {
          id
          colors
          topics
          createdAt
          updatedAt
          settingsUserId
          __typename
        }
        active {
          id
          topic
          color
          pen
          background
          underline
          createdAt
          updatedAt
          activeUserId
          __typename
        }
        highlights {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        userSettingsId
        userActiveId
        __typename
      }
      createdAt
      updatedAt
      settingsUserId
      __typename
    }
  }
`;
export const listSettings = /* GraphQL */ `
  query ListSettings(
    $filter: ModelSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        colors
        topics
        user {
          id
          createdAt
          updatedAt
          userSettingsId
          userActiveId
          __typename
        }
        createdAt
        updatedAt
        settingsUserId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
