/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateHighlightInput = {
  id?: string | null,
  xpath: string,
  data: string,
  color: string,
  domain: string,
  time: string,
  topic: string,
  htmlMarkup: string,
  userHighlightsId?: string | null,
};

export type ModelHighlightConditionInput = {
  xpath?: ModelStringInput | null,
  data?: ModelStringInput | null,
  color?: ModelStringInput | null,
  domain?: ModelStringInput | null,
  time?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  htmlMarkup?: ModelStringInput | null,
  and?: Array< ModelHighlightConditionInput | null > | null,
  or?: Array< ModelHighlightConditionInput | null > | null,
  not?: ModelHighlightConditionInput | null,
  userHighlightsId?: ModelIDInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Highlight = {
  __typename: "Highlight",
  id: string,
  xpath: string,
  data: string,
  color: string,
  domain: string,
  time: string,
  topic: string,
  htmlMarkup: string,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userHighlightsId?: string | null,
  owner?: string | null,
};

export type User = {
  __typename: "User",
  id: string,
  settings?: Settings | null,
  active?: Active | null,
  highlights?: ModelHighlightConnection | null,
  createdAt: string,
  updatedAt: string,
  userSettingsId?: string | null,
  userActiveId?: string | null,
  owner?: string | null,
};

export type Settings = {
  __typename: "Settings",
  id: string,
  colors: Array< string | null >,
  topics: Array< string | null >,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  settingsUserId?: string | null,
  owner?: string | null,
};

export type Active = {
  __typename: "Active",
  id: string,
  topic: string,
  color: string,
  pen: boolean,
  background: boolean,
  underline: boolean,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  activeUserId?: string | null,
  owner?: string | null,
};

export type ModelHighlightConnection = {
  __typename: "ModelHighlightConnection",
  items:  Array<Highlight | null >,
  nextToken?: string | null,
};

export type UpdateHighlightInput = {
  id: string,
  xpath?: string | null,
  data?: string | null,
  color?: string | null,
  domain?: string | null,
  time?: string | null,
  topic?: string | null,
  htmlMarkup?: string | null,
  userHighlightsId?: string | null,
};

export type DeleteHighlightInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  userSettingsId?: string | null,
  userActiveId?: string | null,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  userSettingsId?: ModelIDInput | null,
  userActiveId?: ModelIDInput | null,
};

export type UpdateUserInput = {
  id: string,
  userSettingsId?: string | null,
  userActiveId?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateActiveInput = {
  id?: string | null,
  topic: string,
  color: string,
  pen: boolean,
  background: boolean,
  underline: boolean,
  activeUserId?: string | null,
};

export type ModelActiveConditionInput = {
  topic?: ModelStringInput | null,
  color?: ModelStringInput | null,
  pen?: ModelBooleanInput | null,
  background?: ModelBooleanInput | null,
  underline?: ModelBooleanInput | null,
  and?: Array< ModelActiveConditionInput | null > | null,
  or?: Array< ModelActiveConditionInput | null > | null,
  not?: ModelActiveConditionInput | null,
  activeUserId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateActiveInput = {
  id: string,
  topic?: string | null,
  color?: string | null,
  pen?: boolean | null,
  background?: boolean | null,
  underline?: boolean | null,
  activeUserId?: string | null,
};

export type DeleteActiveInput = {
  id: string,
};

export type CreateSettingsInput = {
  id?: string | null,
  colors: Array< string | null >,
  topics: Array< string | null >,
  settingsUserId?: string | null,
};

export type ModelSettingsConditionInput = {
  colors?: ModelStringInput | null,
  topics?: ModelStringInput | null,
  and?: Array< ModelSettingsConditionInput | null > | null,
  or?: Array< ModelSettingsConditionInput | null > | null,
  not?: ModelSettingsConditionInput | null,
  settingsUserId?: ModelIDInput | null,
};

export type UpdateSettingsInput = {
  id: string,
  colors?: Array< string | null > | null,
  topics?: Array< string | null > | null,
  settingsUserId?: string | null,
};

export type DeleteSettingsInput = {
  id: string,
};

export type ModelHighlightFilterInput = {
  id?: ModelIDInput | null,
  xpath?: ModelStringInput | null,
  data?: ModelStringInput | null,
  color?: ModelStringInput | null,
  domain?: ModelStringInput | null,
  time?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  htmlMarkup?: ModelStringInput | null,
  and?: Array< ModelHighlightFilterInput | null > | null,
  or?: Array< ModelHighlightFilterInput | null > | null,
  not?: ModelHighlightFilterInput | null,
  userHighlightsId?: ModelIDInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  userSettingsId?: ModelIDInput | null,
  userActiveId?: ModelIDInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelActiveFilterInput = {
  id?: ModelIDInput | null,
  topic?: ModelStringInput | null,
  color?: ModelStringInput | null,
  pen?: ModelBooleanInput | null,
  background?: ModelBooleanInput | null,
  underline?: ModelBooleanInput | null,
  and?: Array< ModelActiveFilterInput | null > | null,
  or?: Array< ModelActiveFilterInput | null > | null,
  not?: ModelActiveFilterInput | null,
  activeUserId?: ModelIDInput | null,
};

export type ModelActiveConnection = {
  __typename: "ModelActiveConnection",
  items:  Array<Active | null >,
  nextToken?: string | null,
};

export type ModelSettingsFilterInput = {
  id?: ModelIDInput | null,
  colors?: ModelStringInput | null,
  topics?: ModelStringInput | null,
  and?: Array< ModelSettingsFilterInput | null > | null,
  or?: Array< ModelSettingsFilterInput | null > | null,
  not?: ModelSettingsFilterInput | null,
  settingsUserId?: ModelIDInput | null,
};

export type ModelSettingsConnection = {
  __typename: "ModelSettingsConnection",
  items:  Array<Settings | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionHighlightFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  xpath?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  domain?: ModelSubscriptionStringInput | null,
  time?: ModelSubscriptionStringInput | null,
  topic?: ModelSubscriptionStringInput | null,
  htmlMarkup?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionHighlightFilterInput | null > | null,
  or?: Array< ModelSubscriptionHighlightFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionActiveFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  topic?: ModelSubscriptionStringInput | null,
  color?: ModelSubscriptionStringInput | null,
  pen?: ModelSubscriptionBooleanInput | null,
  background?: ModelSubscriptionBooleanInput | null,
  underline?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionActiveFilterInput | null > | null,
  or?: Array< ModelSubscriptionActiveFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionSettingsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  colors?: ModelSubscriptionStringInput | null,
  topics?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSettingsFilterInput | null > | null,
  or?: Array< ModelSubscriptionSettingsFilterInput | null > | null,
};

export type CreateHighlightMutationVariables = {
  input: CreateHighlightInput,
  condition?: ModelHighlightConditionInput | null,
};

export type CreateHighlightMutation = {
  createHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateHighlightMutationVariables = {
  input: UpdateHighlightInput,
  condition?: ModelHighlightConditionInput | null,
};

export type UpdateHighlightMutation = {
  updateHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteHighlightMutationVariables = {
  input: DeleteHighlightInput,
  condition?: ModelHighlightConditionInput | null,
};

export type DeleteHighlightMutation = {
  deleteHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateActiveMutationVariables = {
  input: CreateActiveInput,
  condition?: ModelActiveConditionInput | null,
};

export type CreateActiveMutation = {
  createActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateActiveMutationVariables = {
  input: UpdateActiveInput,
  condition?: ModelActiveConditionInput | null,
};

export type UpdateActiveMutation = {
  updateActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteActiveMutationVariables = {
  input: DeleteActiveInput,
  condition?: ModelActiveConditionInput | null,
};

export type DeleteActiveMutation = {
  deleteActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateSettingsMutationVariables = {
  input: CreateSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type CreateSettingsMutation = {
  createSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateSettingsMutationVariables = {
  input: UpdateSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type UpdateSettingsMutation = {
  updateSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteSettingsMutationVariables = {
  input: DeleteSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type DeleteSettingsMutation = {
  deleteSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type GetHighlightQueryVariables = {
  id: string,
};

export type GetHighlightQuery = {
  getHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListHighlightsQueryVariables = {
  filter?: ModelHighlightFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHighlightsQuery = {
  listHighlights?:  {
    __typename: "ModelHighlightConnection",
    items:  Array< {
      __typename: "Highlight",
      id: string,
      xpath: string,
      data: string,
      color: string,
      domain: string,
      time: string,
      topic: string,
      htmlMarkup: string,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userHighlightsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetActiveQueryVariables = {
  id: string,
};

export type GetActiveQuery = {
  getActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListActivesQueryVariables = {
  filter?: ModelActiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivesQuery = {
  listActives?:  {
    __typename: "ModelActiveConnection",
    items:  Array< {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSettingsQueryVariables = {
  id: string,
};

export type GetSettingsQuery = {
  getSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListSettingsQueryVariables = {
  filter?: ModelSettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSettingsQuery = {
  listSettings?:  {
    __typename: "ModelSettingsConnection",
    items:  Array< {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateHighlightSubscriptionVariables = {
  filter?: ModelSubscriptionHighlightFilterInput | null,
  owner?: string | null,
};

export type OnCreateHighlightSubscription = {
  onCreateHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateHighlightSubscriptionVariables = {
  filter?: ModelSubscriptionHighlightFilterInput | null,
  owner?: string | null,
};

export type OnUpdateHighlightSubscription = {
  onUpdateHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteHighlightSubscriptionVariables = {
  filter?: ModelSubscriptionHighlightFilterInput | null,
  owner?: string | null,
};

export type OnDeleteHighlightSubscription = {
  onDeleteHighlight?:  {
    __typename: "Highlight",
    id: string,
    xpath: string,
    data: string,
    color: string,
    domain: string,
    time: string,
    topic: string,
    htmlMarkup: string,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userHighlightsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    settings?:  {
      __typename: "Settings",
      id: string,
      colors: Array< string | null >,
      topics: Array< string | null >,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      settingsUserId?: string | null,
      owner?: string | null,
    } | null,
    active?:  {
      __typename: "Active",
      id: string,
      topic: string,
      color: string,
      pen: boolean,
      background: boolean,
      underline: boolean,
      user?:  {
        __typename: "User",
        id: string,
        createdAt: string,
        updatedAt: string,
        userSettingsId?: string | null,
        userActiveId?: string | null,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      activeUserId?: string | null,
      owner?: string | null,
    } | null,
    highlights?:  {
      __typename: "ModelHighlightConnection",
      items:  Array< {
        __typename: "Highlight",
        id: string,
        xpath: string,
        data: string,
        color: string,
        domain: string,
        time: string,
        topic: string,
        htmlMarkup: string,
        createdAt: string,
        updatedAt: string,
        userHighlightsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userSettingsId?: string | null,
    userActiveId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateActiveSubscriptionVariables = {
  filter?: ModelSubscriptionActiveFilterInput | null,
  owner?: string | null,
};

export type OnCreateActiveSubscription = {
  onCreateActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateActiveSubscriptionVariables = {
  filter?: ModelSubscriptionActiveFilterInput | null,
  owner?: string | null,
};

export type OnUpdateActiveSubscription = {
  onUpdateActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteActiveSubscriptionVariables = {
  filter?: ModelSubscriptionActiveFilterInput | null,
  owner?: string | null,
};

export type OnDeleteActiveSubscription = {
  onDeleteActive?:  {
    __typename: "Active",
    id: string,
    topic: string,
    color: string,
    pen: boolean,
    background: boolean,
    underline: boolean,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    activeUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnCreateSettingsSubscription = {
  onCreateSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSettingsSubscription = {
  onUpdateSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteSettingsSubscriptionVariables = {
  filter?: ModelSubscriptionSettingsFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSettingsSubscription = {
  onDeleteSettings?:  {
    __typename: "Settings",
    id: string,
    colors: Array< string | null >,
    topics: Array< string | null >,
    user?:  {
      __typename: "User",
      id: string,
      settings?:  {
        __typename: "Settings",
        id: string,
        colors: Array< string | null >,
        topics: Array< string | null >,
        createdAt: string,
        updatedAt: string,
        settingsUserId?: string | null,
        owner?: string | null,
      } | null,
      active?:  {
        __typename: "Active",
        id: string,
        topic: string,
        color: string,
        pen: boolean,
        background: boolean,
        underline: boolean,
        createdAt: string,
        updatedAt: string,
        activeUserId?: string | null,
        owner?: string | null,
      } | null,
      highlights?:  {
        __typename: "ModelHighlightConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userSettingsId?: string | null,
      userActiveId?: string | null,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    settingsUserId?: string | null,
    owner?: string | null,
  } | null,
};
