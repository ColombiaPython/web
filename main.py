from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.routing import Route


async def homepage(request: Request) -> JSONResponse:
    return JSONResponse({"message": "Aquí nacerá un nuevo portal web para Python Colombia!"})


app = Starlette(
    routes=[
        Route("/", homepage),
    ],
)
