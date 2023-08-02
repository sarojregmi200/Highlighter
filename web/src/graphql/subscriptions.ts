/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHighlight = /* GraphQL */ `
  subscription OnCreateHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
    $owner: String
  ) {
    onCreateHighlight(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      userHighlightsId
      owner
      __typename
    }
  }
`;
export const onUpdateHighlight = /* GraphQL */ `
  subscription OnUpdateHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
    $owner: String
  ) {
    onUpdateHighlight(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      userHighlightsId
      owner
      __typename
    }
  }
`;
export const onDeleteHighlight = /* GraphQL */ `
  subscription OnDeleteHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
    $owner: String
  ) {
    onDeleteHighlight(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      userHighlightsId
      owner
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        settingsUserId
        owner
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
          owner
          __typename
        }
        createdAt
        updatedAt
        activeUserId
        owner
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userSettingsId
      userActiveId
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        settingsUserId
        owner
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
          owner
          __typename
        }
        createdAt
        updatedAt
        activeUserId
        owner
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userSettingsId
      userActiveId
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
          owner
          __typename
        }
        createdAt
        updatedAt
        settingsUserId
        owner
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
          owner
          __typename
        }
        createdAt
        updatedAt
        activeUserId
        owner
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
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      userSettingsId
      userActiveId
      owner
      __typename
    }
  }
`;
export const onCreateActive = /* GraphQL */ `
  subscription OnCreateActive(
    $filter: ModelSubscriptionActiveFilterInput
    $owner: String
  ) {
    onCreateActive(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      activeUserId
      owner
      __typename
    }
  }
`;
export const onUpdateActive = /* GraphQL */ `
  subscription OnUpdateActive(
    $filter: ModelSubscriptionActiveFilterInput
    $owner: String
  ) {
    onUpdateActive(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      activeUserId
      owner
      __typename
    }
  }
`;
export const onDeleteActive = /* GraphQL */ `
  subscription OnDeleteActive(
    $filter: ModelSubscriptionActiveFilterInput
    $owner: String
  ) {
    onDeleteActive(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      activeUserId
      owner
      __typename
    }
  }
`;
export const onCreateSettings = /* GraphQL */ `
  subscription OnCreateSettings(
    $filter: ModelSubscriptionSettingsFilterInput
    $owner: String
  ) {
    onCreateSettings(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      settingsUserId
      owner
      __typename
    }
  }
`;
export const onUpdateSettings = /* GraphQL */ `
  subscription OnUpdateSettings(
    $filter: ModelSubscriptionSettingsFilterInput
    $owner: String
  ) {
    onUpdateSettings(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      settingsUserId
      owner
      __typename
    }
  }
`;
export const onDeleteSettings = /* GraphQL */ `
  subscription OnDeleteSettings(
    $filter: ModelSubscriptionSettingsFilterInput
    $owner: String
  ) {
    onDeleteSettings(filter: $filter, owner: $owner) {
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
          owner
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
          owner
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
        owner
        __typename
      }
      createdAt
      updatedAt
      settingsUserId
      owner
      __typename
    }
  }
`;
