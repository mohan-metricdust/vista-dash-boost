
import { Amplify } from 'aws-amplify';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export const configureCognito = (config: any) => {
  const cognitoConfig = config.cognito;
  const currentOrigin = window.location.origin;
  
  console.log('Configuring Cognito with:', {
    userPoolId: cognitoConfig.cognito_user_pool_id,
    clientId: cognitoConfig.cognito_client_id,
    domain: cognitoConfig.cognito_domain_url,
    currentOrigin
  });
  
  const amplifyConfig = {
    Auth: {
      // Amazon Cognito User Pool ID
      userPoolId: cognitoConfig.cognito_user_pool_id,
      // Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: cognitoConfig.cognito_client_id,
      // Amazon Cognito Region
      region: 'us-east-1', // Extract from user pool ID or set explicitly
      oauth: {
        domain: cognitoConfig.cognito_domain_url,
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: `${currentOrigin}/auth/callback`,
        redirectSignOut: `${currentOrigin}/logout`,
        responseType: 'code'
      }
    }
  };
  
  console.log('Amplify config:', amplifyConfig);
  
  try {
    Amplify.configure(amplifyConfig);
    console.log('Cognito configured successfully');
  } catch (error) {
    console.error('Error configuring Cognito:', error);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<void> => {
  try {
    console.log('Initiating Google sign-in...');
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await Auth.signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};



export const getCurrentAuthUser = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    
    if (currentUser) {
      const session = currentUser.signInUserSession;
      const attributes = session?.idToken?.payload || {};
      
      console.log('Current authenticated user:', {
        username: currentUser.username,
        userId: attributes.sub || currentUser.username,
        email: attributes.email
      });
      
      return {
        username: currentUser.username,
        userId: attributes.sub || currentUser.username,
        attributes,
        signInUserSession: session
      };
    }
    
    return null;
  } catch (error) {
    console.log('No authenticated user:', error.message);
    return null;
  }
};
