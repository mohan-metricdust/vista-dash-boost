
export const environment = {
    "stage": "beta",
    "production": "false",
    "cognito": {
        "userPoolId": "us-east-1_TvnPpFewj",
        "userPoolWebClientId": "58qaobe5urmt71qun0n8oefhla"
    },
    "GET_TENET_BY_EMAILID": "https://cnvjhm3smh.execute-api.us-east-1.amazonaws.com/beta/Iam/tenant/useremail/<email>",
    "GENERATE_TOKEN": "https://cnvjhm3smh.execute-api.us-east-1.amazonaws.com/beta/token/generate",
    "GET_TENANT_LOGO": "https://cnvjhm3smh.execute-api.us-east-1.amazonaws.com/beta/tenant/logo",
    "GET_BRANDING_COLOR_API": "https://cnvjhm3smh.execute-api.us-east-1.amazonaws.com/beta/tenant/branding",
    "GENERATE_TOKEN_BY_JOBID":"https://08gatq420e.execute-api.us-west-2.amazonaws.com/beta/DistributedTokenGenerationService/stage/beta/tenant/<tenant>/StartSessionWithJobId/conversationInstanceOrJobIOrTaskdentity/<jobId>",
    "UnifiedFunnelInitialization_StartSessionWithJobId":"https://7dtgfy71ie.execute-api.us-west-2.amazonaws.com/beta/CandidateLeadService/stage/beta/tenant/<tenant>/UnifiedFunnelInitSession/jobID/<jobId>/funnel_id/<funnelID>",
    "getOrCreateUserCallDetails": "https://vk5z0g74w1.execute-api.us-west-2.amazonaws.com/beta/FreePlayGroundCallLogManagementService/stage/beta/tenant/<tenant>/getOrCreateUserCallDetails/category/<category>/identity/<identity>",
    "AssembleAndStartSession":"https://7dtgfy71ie.execute-api.us-west-2.amazonaws.com/beta/CandidateLeadService/stage/beta/tenant/<tenant>/AssembleAndStartSessionProxy/user_session_id/<user_session_id>"

}
