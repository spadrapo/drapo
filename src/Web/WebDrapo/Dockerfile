FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
ARG source=.
WORKDIR /app
EXPOSE 9991
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "WebDrapo.dll"]
