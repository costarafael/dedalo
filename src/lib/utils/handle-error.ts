import { NextResponse } from 'next/server'

type PostgrestError = {
  message: string
  details: string
  hint: string
  code: string
}

export function handleError(error: unknown) {
  // Log detalhado do erro
  console.error('API Error:', {
    message: error instanceof Error ? error.message : 'Unknown error',
    details: error && typeof error === 'object' && 'details' in error ? error.details : undefined,
    hint: error && typeof error === 'object' && 'hint' in error ? error.hint : undefined,
    code: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
    stack: error instanceof Error ? error.stack : undefined
  })

  // Verifica se é um erro do Postgrest
  if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    const pgError = error as PostgrestError
    return NextResponse.json(
      { 
        error: pgError.message,
        details: pgError.details,
        hint: pgError.hint,
        code: pgError.code
      },
      { status: 400 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { error: 'Erro interno do servidor' },
    { status: 500 }
  )
}
