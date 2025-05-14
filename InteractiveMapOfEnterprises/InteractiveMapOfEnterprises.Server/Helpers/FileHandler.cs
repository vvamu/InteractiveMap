namespace InteractiveMapOfEnterprises.Server.Helpers
{
    public static class FileHandler
    {
        public static async Task<byte[]?> GetBytesAsync(IFormFile? fileToUpload, byte[]? oldImageBytes)
        {
            await CheckCanUploadFileAsync(fileToUpload, oldImageBytes);
            return GetBytes(fileToUpload);
        }
        private static async Task CheckCanUploadFileAsync(IFormFile? fileToUpload, byte[]? oldImageBytes)
        {
            if (fileToUpload == null) throw new Exception("Image not passed to server");
            var fileExtension = Path.GetExtension(fileToUpload?.FileName);
            string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
            if (!allowedExtensions.Any(ext => ext.Equals(fileExtension, StringComparison.OrdinalIgnoreCase))) throw new BadImageFormatException();

            if (fileToUpload == null || fileToUpload.Length <= 0) throw new Exception("Before save you need to update image or image not set or file not correct");
            if (fileToUpload.Length > 30000000) throw new Exception("File weight too large. Compress image and try load later");
            if (fileToUpload.Length <= 0) throw new Exception("File is incorrect");

            await CheckValueIsNew(fileToUpload, oldImageBytes);

        }
        private static async Task CheckValueIsNew(IFormFile fileToUpload, byte[]? oldImageBytes)
        {
            if (oldImageBytes?.Length == 0 || oldImageBytes?.Length == null) return;
            if (fileToUpload.Length == oldImageBytes?.Length) throw new Exception("Uploaded file have equals size with already uploaded");

        }

        private static byte[]? GetBytes(IFormFile file)
        {
            long length = file.Length;
            using var fileStream = file.OpenReadStream();
            byte[] bytes = new byte[length];
            fileStream.Read(bytes, 0, (int)file.Length);
            return bytes;
        }
    }
}
