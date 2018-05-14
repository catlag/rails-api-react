class ComponentsController < ApiController
  skip_before_filter :check_authorization_header, :only => [:all_from_category]

  def all_from_category
     q = params[:q]

    if q.blank?
      render status: 400, json: { error: 'Expected parameter `q` '}
    else
    render(json:  @components = Component.where(category: params[:q]))
    end 
  end 

  def update_category
    @components.delete_all 
    # new components 
  end 

  private

  def all_from_page
    @components = Component.where(category: 'illustration')
  end 
end
