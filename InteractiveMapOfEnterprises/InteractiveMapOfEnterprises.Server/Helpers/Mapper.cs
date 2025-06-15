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
            case EditUserViewModel: { return toEditUserViewModel(jsonData); }
            case ApplicationUser: { return toUser(jsonData); }
            default: { return toCompany(jsonData); }
            }

        }

        private static Company toCompany(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);
            string pattern = "yyyy-MM-dd";

            JsonNode content = jsonNode["data"];
            if (content == null) throw new Exception("Данные о компании не были переданы");
            var name = content["name"].ToString();
            var description = content["description"].ToString();
            var regionId = content["regionId"].ToString();
            var position = content["position"];
            var positionLat = position["lat"].ToString();
            var positionLng = position["lng"].ToString();
            var category = content["category"].ToString();

            var dateFoundation = DateTime.Now;
            Uri uri = null;
            Guid id = Guid.Empty;
            try
            {
                
            DateTime.TryParseExact(content["dateFoundation"].ToString(), pattern, null, DateTimeStyles.None, out dateFoundation);
            }
            catch (Exception ex) { }
            try
            {
               
                Uri.TryCreate(content["uri"].ToString(), UriKind.Absolute, out uri);
            }
            catch (Exception ex) { }
            try
                {
                    
                Guid.TryParse(content["id"].ToString(), out id);
            }
            catch (Exception ex) { }

            Company company = new Company()
            {
                Id = id,
                Name = name,
                Description = description,
                DateFoundation = dateFoundation,
                RegionId = regionId,
                Latitude = positionLat,
                Altitude = positionLng,
                DateCreatedArticle = DateTime.Now,
                Category = category,
                Uri = uri
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
            string username;
            string name = "";
            string password;

            try
            {
               username = content["username"].ToString();
            }
            catch(Exception ex) { throw new Exception("Не задан логин"); }
            try
            {
                password = content["password"].ToString();
            }
            catch (Exception ex){ throw new Exception("Не задан пароль");}

            try
            {
                name = content["name"].ToString();
            }
            catch (Exception ex) { }

            var loginUser = new CreateUserViewModel() { UserName = username, Password = password, Name = name };
            return loginUser;
        }

        private static ApplicationUser toUser(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];

            var username = content["username"]?.ToString();
            //var roles = content["roles"].ToString();
            var name = content["name"]?.ToString();
            var password = content["password"]?.ToString();

            Guid id;
            Guid.TryParse(content["id"]?.ToString(), out id);

            var loginUser = new ApplicationUser() { UserName = username, Password = password, Name = name ,Id = id};
            return loginUser;
        }

        private static EditUserViewModel toEditUserViewModel(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];

            var username = content["username"]?.ToString();
            //var roles = content["roles"].ToString();
            var name = content["name"]?.ToString();
            var password = content["password"]?.ToString();

            Guid id;
            Guid.TryParse(content["id"]?.ToString(), out id);

            var loginUser = new EditUserViewModel() { UserName = username, Password = password, Name = name, Id = id };
            return loginUser;
        }
        private static EditUserAdminViewModel toEditUserAdminViewModel(string jsonData)
        {
            JsonNode jsonNode = JsonNode.Parse(jsonData);

            JsonNode content = jsonNode["data"];
            var id = Guid.Parse(content["id"].ToString());

            var roles = content["roles"].ToString();
           
            var loginUser = new EditUserAdminViewModel() { Id =  id,Roles= roles};
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
