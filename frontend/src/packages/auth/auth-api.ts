import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { BaseHttpApi } from '~/libs/packages/api/api.js';
import { type Http, HttpMethod } from '~/libs/packages/http/http.js';
import { type Storage } from '~/libs/packages/storage/storage.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: Http;
  storage: Storage;
};

class AuthApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.AUTH, baseUrl, http, storage });
  }

  public async signUp(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return response.json<UserSignUpResponseDto>();
  }

  public async signIn(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return response.json<UserSignInResponseDto>();
  }

  public async getAuthenticatedUser(): Promise<UserAuthResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.AUTHENTICATED_USER, {}),
      {
        method: HttpMethod.GET,
        hasAuth: true,
      },
    );

    return response.json<UserAuthResponseDto>();
  }
}

export { AuthApi };
