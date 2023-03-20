using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Models.Domain.MilitaryProfile;
using Sabio.Models;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests.MilitaryProfiles;
using Sabio.Models.Domain.SiteReferences;
using Sabio.Models.Requests.SiteReference;
using Sabio.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Domain;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sitereferences")]
    [ApiController]
    
    public class SiteReferenceApiController : BaseApiController
    {
        private ISiteReferenceService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SiteReferenceApiController(ISiteReferenceService service
            , ILogger<SiteReferenceApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<SiteReference>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SiteReference> page = _service.GetAll(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SiteReference>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Add(SiteReferenceAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                _service.Add(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("summary")]
        public ActionResult<ItemsResponse<SiteReferenceSummary>> GetSummary()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<SiteReferenceSummary> list = _service.GetSummary();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<SiteReferenceSummary> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
