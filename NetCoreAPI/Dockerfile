FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["NetCoreAPI.csproj", "./"]
RUN dotnet restore "./NetCoreAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "NetCoreAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NetCoreAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NetCoreAPI.dll"]