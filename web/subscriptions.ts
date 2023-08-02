/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHighlight = /* GraphQL */ `
  subscription OnCreateHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
  ) {
    onCreateHighlight(filter: $filter) {
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
export const onUpdateHighlight = /* GraphQL */ `
  subscription OnUpdateHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
  ) {
    onUpdateHighlight(filter: $filter) {
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
export const onDeleteHighlight = /* GraphQL */ `
  subscription OnDeleteHighlight(
    $filter: ModelSubscriptionHighlightFilterInput
  ) {
    onDeleteHighlight(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateActive = /* GraphQL */ `
  subscription OnCreateActive($filter: ModelSubscriptionActiveFilterInput) {
    onCreateActive(filter: $filter) {
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
export const onUpdateActive = /* GraphQL */ `
  subscription OnUpdateActive($filter: ModelSubscriptionActiveFilterInput) {
    onUpdateActive(filter: $filter) {
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
export const onDeleteActive = /* GraphQL */ `
  subscription OnDeleteActive($filter: ModelSubscriptionActiveFilterInput) {
    onDeleteActive(filter: $filter) {
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
export const onCreateSettings = /* GraphQL */ `
  subscription OnCreateSettings($filter: ModelSubscriptionSettingsFilterInput) {
    onCreateSettings(filter: $filter) {
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
export const onUpdateSettings = /* GraphQL */ `
  subscription OnUpdateSettings($filter: ModelSubscriptionSettingsFilterInput) {
    onUpdateSettings(filter: $filter) {
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
export const onDeleteSettings = /* GraphQL */ `
  subscription OnDeleteSettings($filter: ModelSubscriptionSettingsFilterInput) {
    onDeleteSettings(filter: $filter) {
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
