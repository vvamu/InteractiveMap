using AutoMapper;
using InteractiveMapOfEnterprises.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InteractiveMapOfEnterprises.Server.Helpers
{
    public static class Mapper
    {

        public static Object Map(string jsonData,Object resultObjectType)
        {
           switch (resultObjectType){
            case LoginUserViewModel: { return toLoginUserViewModel(jsonData); }
            case CreateUserViewModel: { return toCreateUserViewModel(jsonData); }
            case EditUserAdminViewModel: { return toEditUserAdminViewModel(jsonData); }
            case EditUserViewModel: { return toEditUserAdminViewModel(jsonData); }
            default: { return toCompany(jsonData); }
            }

        }

        private static Company toCompany(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);
            string pattern = "yyyy-MM-dd";

            JsonNode content = jsonNode["data"];
            var name = content["name"].ToString();
            var description = content["description"].ToString();
            var regionId = content["idRegion"].ToString();
            var position = content["position"];
            var positionLat = position["lat"].ToString();
            var positionLng = position["lng"].ToString();
            var category = content["category"].ToString();

            var foundationDate = DateTime.Now;
            DateTime.TryParseExact(content["foundationDate"].ToString(), pattern, null, DateTimeStyles.None, out foundationDate);

            Company company = new Company()
            {
                Name = name,
                Description = description,
                DateFoundation = foundationDate,
                RegionId = regionId,
                Latitude = positionLat,
                Altitude = positionLng,
                DateCreatedArticle = DateTime.Now,
                Category = category
            };
            return company;
        }
        private static LoginUserViewModel toLoginUserViewModel(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];
            var username = content["username"].ToString();
            var password = content["password"].ToString();
            var loginUser = new LoginUserViewModel() { UserName = username, Password = password };
            return loginUser;
        }

        private static CreateUserViewModel toCreateUserViewModel(string jsonData) 
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];
            var username = content["username"].ToString();
            //var roles = content["roles"].ToString();
            var name = content["name"].ToString();
            var password = content["password"].ToString();
            var loginUser = new CreateUserViewModel() { UserName = username, Password = password, Name = name };
            return loginUser;
        }
        private static EditUserAdminViewModel toEditUserAdminViewModel(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];
            var id = Guid.Parse(content["username"].ToString());
            var roles = content["roles"].ToString();
           
            var loginUser = new EditUserAdminViewModel() { Id =  id,Roles=roles};
            return loginUser;
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, LoginUserViewModel>().ReverseMap().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<EditUserViewModel, ApplicationUser>()
             .ForMember(dest => dest.Password, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.PasswordChanged) ? src.PasswordChanged : src.Password))
             .ReverseMap()
             .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<ApplicationUser, CreateUserViewModel>().ReverseMap()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
