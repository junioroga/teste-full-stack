import axios from 'axios'

export const API_HEADER_DEFAULT = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'App-Version': process.env.EXPO_PUBLIC_APP_VERSION,
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 3 * 60 * 1000, // 3 minutes
  headers: API_HEADER_DEFAULT,
})

const API_ERROR_TYPE_BAD_REQUEST = 'ERR_BAD_REQUEST'
const API_ERROR_TYPE_NOT_FOUND = 'NOT_FOUND'
const API_ERROR_TYPE_FORBIDDEN = 'FORBIDDEN'
const API_ERROR_TYPE_CONNECTION = 'CONNECTION'
const API_ERROR_TYPE_OTHER = 'OTHER'
const API_ERROR_TYPE_CANCEL = 'CANCEL'
const API_ERRO_TYPE_VALIDATION = 'VALIDATION'

type ErrorRequest = {
  request: {
    status: number
  }
  response: {
    data: {
      message: string
    }
  }
}

export type Error = {
  error_type: string
  error_message: string
  error: any
}

export function getError({
  request: { status },
  response: {
    data: { message },
  },
}: ErrorRequest) {
  let errorType = ''
  let errorMessage = ''

  if (status) {
    if (message) {
      errorMessage = message
    }

    if (status === 403) {
      errorType = API_ERROR_TYPE_FORBIDDEN

      if (!errorMessage) {
        errorMessage =
          'Ocorreu um erro na solicitação. Tente novamente em alguns minutos.'
      }
    } else if (status === 404) {
      errorType = API_ERROR_TYPE_NOT_FOUND

      if (!errorMessage) {
        errorMessage = 'A rota solicitada não existe.'
      }
    } else if (status === 422) {
      errorType = API_ERRO_TYPE_VALIDATION

      if (!errorMessage) {
        errorMessage = 'Campos preenchidos incorretamente.'
      }
    } else if (status >= 400 && status <= 499) {
      errorType = API_ERROR_TYPE_BAD_REQUEST

      if (!errorMessage) {
        errorMessage = 'Parâmetros inválidos'
      }
    } else {
      errorType = API_ERROR_TYPE_OTHER

      if (!errorMessage) {
        errorMessage =
          'Ocorreu um erro na solicitação. Tente novamente em alguns minutos.'
      }
    }
  } else {
    errorType = API_ERROR_TYPE_CONNECTION
    errorMessage =
      'A comunicação com o servidor falhou. Verifique sua conexão com a internet e tente novamente.'
  }

  return {
    error_type: errorType,
    error_message: errorMessage,
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      const errorReturn = {
        error,
        error_type: API_ERROR_TYPE_CANCEL,
        error_message: 'Solicitação cancelada.',
      }

      errorReturn.toString = () => errorReturn.error_message

      return Promise.reject(errorReturn)
    }

    const errorReturn: Error = {
      error,
      ...getError(error),
    }

    return Promise.reject(errorReturn)
  },
)
