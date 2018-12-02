class SesionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
      if autor = Autor.validate_login(params[:email], params[:password])
          use_token_only_once_for(autor)
          token_send_for_login_of(autor)
      else
          render_unauthorized("Something is wrong with your login or password")
      end
  end

  def destroy
      logout
      head :ok
  end

  private

  def logout
    curautor.invalidate_token
  end

  def use_token_only_once_for(autor)
    autor.regenerate_token
  end

  def token_send_for_login_of(autor)
      render json: {token: autor.token}
  end

  

end