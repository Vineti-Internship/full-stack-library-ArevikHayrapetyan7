Class ApiController < ApplicationController

  def currentautor
  @currentauthor ||= authenticate_token
  end

  def require_login
      authenticate_token || render_unauthorized('Accsess Denied')
  end

  private

  def authenticate_token
      authenticate_with_http_token do | token, options |
          Autor.find_by(token: token)
      end
  end

  protected 

  def render_unauthorized(message)
      errors = { errors: [detail: message]}
      render json: errors, status: :unauthorized
  end


end