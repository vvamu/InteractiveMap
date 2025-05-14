using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InteractiveMapOfEnterprises.Server.Migrations
{
    /// <inheritdoc />
    public partial class addCategoryToCompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShortName",
                table: "Companies",
                newName: "Description");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Companies");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Companies",
                newName: "ShortName");
        }
    }
}
