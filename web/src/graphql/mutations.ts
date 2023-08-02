/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHighlight = /* GraphQL */ `
  mutation CreateHighlight(
    $input: CreateHighlightInput!
    $condition: ModelHighlightConditionInput
  ) {
    createHighlight(input: $input, condition: $condition) {
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
export const updateHighlight = /* GraphQL */ `
  mutation UpdateHighlight(
    $input: UpdateHighlightInput!
    $condition: ModelHighlightConditionInput
  ) {
    updateHighlight(input: $input, condition: $condition) {
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
export const deleteHighlight = /* GraphQL */ `
  mutation DeleteHighlight(
    $input: DeleteHighlightInput!
    $condition: ModelHighlightConditionInput
  ) {
    deleteHighlight(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createActive = /* GraphQL */ `
  mutation CreateActive(
    $input: CreateActiveInput!
    $condition: ModelActiveConditionInput
  ) {
    createActive(input: $input, condition: $condition) {
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
export const updateActive = /* GraphQL */ `
  mutation UpdateActive(
    $input: UpdateActiveInput!
    $condition: ModelActiveConditionInput
  ) {
    updateActive(input: $input, condition: $condition) {
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
export const deleteActive = /* GraphQL */ `
  mutation DeleteActive(
    $input: DeleteActiveInput!
    $condition: ModelActiveConditionInput
  ) {
    deleteActive(input: $input, condition: $condition) {
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
export const createSettings = /* GraphQL */ `
  mutation CreateSettings(
    $input: CreateSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    createSettings(input: $input, condition: $condition) {
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
export const updateSettings = /* GraphQL */ `
  mutation UpdateSettings(
    $input: UpdateSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    updateSettings(input: $input, condition: $condition) {
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
export const deleteSettings = /* GraphQL */ `
  mutation DeleteSettings(
    $input: DeleteSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    deleteSettings(input: $input, condition: $condition) {
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
