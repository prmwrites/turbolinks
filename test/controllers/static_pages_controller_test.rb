require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get about" do
    get :about
    assert_response :success
		assert_select "title", "Turbolinks App"
  end

  test "should get music" do
    get :music
    assert_response :success
		assert_select "title", "Music | Turbolinks App"
  end

  test "should get projects" do
    get :projects
    assert_response :success
		assert_select "title", "Projects | Turbolinks App"
  end

  test "should get contact" do
    get :contact
    assert_response :success
		assert_select "title", "Contact | Turbolinks App"
  end

end
