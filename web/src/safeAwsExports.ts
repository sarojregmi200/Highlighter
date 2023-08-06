const awsmobile = {
  aws_project_region: import.meta.env.VITE_aws_project_region,
  aws_appsync_graphqlEndpoint: import.meta.env.VITE_aws_appsync_graphqlEndpoint,
  aws_appsync_region: "ap-south-1",
  aws_appsync_authenticationType: import.meta.env
    .VITE_aws_appsync_authenticationType,
  aws_cognito_identity_pool_id: import.meta.env
    .VITE_aws_cognito_identity_pool_id,
  aws_cognito_region: import.meta.env.VITE_aws_cognito_region,
  aws_user_pools_id: import.meta.env.VITE_aws_user_pools_id,
  aws_user_pools_web_client_id: import.meta.env
    .VITE_aws_user_pools_web_client_id,
  oauth: {},
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};

export default awsmobile;
