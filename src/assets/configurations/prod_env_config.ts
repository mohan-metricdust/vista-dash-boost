
export const environment = {
    "stage": "prod",
    "production": "false",
    "cognito": {
        "userPoolId": "us-east-1_yD4hGpqCV",
        "userPoolWebClientId": "6ffod16rul8j5mf2m566ansjub"
    },
    "GET_TENET_BY_EMAILID": "https://qr0iqeq7hk.execute-api.us-east-1.amazonaws.com/prod/Iam/tenant/useremail/<email>",
    "GENERATE_TOKEN": "https://qr0iqeq7hk.execute-api.us-east-1.amazonaws.com/prod/token/generate",
    "GET_TENANT_LOGO": "https://qr0iqeq7hk.execute-api.us-east-1.amazonaws.com/prod/tenant/logo",
    "GET_BRANDING_COLOR_API": "https://qr0iqeq7hk.execute-api.us-east-1.amazonaws.com/prod/tenant/branding",
    "GENERATE_TOKEN_BY_JOBID":"https://mmftkn9mae.execute-api.us-west-1.amazonaws.com/prod/DistributedTokenGenerationService/stage/prod/tenant/<tenant>/StartSessionWithJobId/conversationInstanceOrJobIOrTaskdentity/<jobId>",
    "UnifiedFunnelInitialization_StartSessionWithJobId":"https://7czmzl4ro2.execute-api.us-west-1.amazonaws.com/prod/CandidateLeadService/stage/prod/tenant/<tenant>/UnifiedFunnelInitSession/jobID/<jobId>/funnel_id/<funnelID>",
    "getOrCreateUserCallDetails": "https://mnzkwlbmie.execute-api.us-west-2.amazonaws.com/prod/FreePlayGroundCallLogManagementService/stage/prod/tenant/<tenant>/getOrCreateUserCallDetails/category/<category>/identity/<identity>",
    "AssembleAndStartSession":"https://7czmzl4ro2.execute-api.us-west-1.amazonaws.com/prod/CandidateLeadService/stage/prod/tenant/<tenant>/AssembleAndStartSessionProxy/user_session_id/<user_session_id>"


}
