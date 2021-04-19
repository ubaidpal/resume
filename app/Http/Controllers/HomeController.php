<?php

namespace App\Http\Controllers;


use App\Device;
use App\Models\Contact;
use App\Models\Info;
use App\Models\Item;
use App\Models\ItemDetails;
use App\Models\Profile;
use App\Models\SocialLink;
use App\Models\User;
use App\Traits\Cropper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


use App\Models\Recommendations;
use Illuminate\Support\Facades\Session;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    use Cropper;
    public function __construct()
    {
        $this->middleware('auth', ['except' => [
            'getMainPage','contactUS','projectDetails','uploadProjectJson'
        ]]);

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $data[ 'name' ]               = \Auth::User()->name;
        $data[ 'adminProfile' ]       =  User::where('id', \Auth::User()->id)->first();
        $data[ 'id' ]                 = \Auth::User()->id;
        $data[ '_page_header' ]       = 'Profile Settings';
        $data[ '_page_header_small' ] = \Config::get('settings.page-header-small');
        $data[ 'active_tab' ]         = 'profile_edit';
        return view('home' ,$data);
    }

    public function profileImageCrops(Request $request) {

        $id   = Auth::id();
        $user = User::find($id);
        if($request->itemId == 'public') {

            $data       = $this->crop('', $request);
            $imageExist = User::where('id', $id)->first();

            if(isset($imageExist->avatar)) {

                $path = public_path('profileImage/' . $imageExist->avatar);
                if(file_exists($path)) {
                    unlink($path);
                }

            }

            $user->avatar = $data[ 'file_name' ];
            if($user->save()) {
                $message = '<i class="fa fa-user fa-lg"></i>&nbsp;Profile Image has been Updated';


            }
            return $data;

        }

    }
    public function profileUpdate(Request $request) {

        $id   = $request->id;
        $user = User::find($id);
        if(!empty($request->name)) {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
            ]);
        }

        if(!empty($request->password)) {
            $validator = Validator::make($request->all(), [
                'password'           => 'min:6|different:old_password',
                'conformed_password' => 'same:password',
            ]);
        }

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $checkIfSavePassword = $request->input('password');
        if(isset($checkIfSavePassword)) {
            $oldPassword      = $request->input('old_password');
            $current_password = $user->password;
            $new_password     = $request->input('password');
            $confirm_password = $request->input('conformed_password');

            if(\Hash::check($oldPassword, $current_password)) {

                if(!empty($request->password) && $new_password != $confirm_password) {

                    return Redirect::back()->withErrors('New password and Confirm password does not match');
                } else {
                    $user->password            = bcrypt($new_password);
                    $user->name                = $request->name;
                    if($user->save()) {
                        $message = '<i class="fa fa-user fa-lg"></i>&nbsp;Account Password has been Changed';
                    }

                    return Redirect::to('/')->with('success', "Password change please re-login...");

                }
            } else {

                return Redirect::back()->withErrors('Old password is incorrect');
            }

        } else {
            $user->name       = $request->name;
            $user->contact    = @$request->contact;
            $user->country    = @$request->country;
            $user->content_id = @$request->content_id;
            $user->save();
            return Redirect::back()->with('message', "Profile Name Change Successfully!!!");
        }

    }


    public function getUser(Request $request, $name) {
        $validator = Validator::make($request->all(), [
            'name'                  => 'required|max:255',
            'email'                 => 'required|email|max:255|unique:users',
            'password'              => 'required|min:6|max:20',
            'password_confirmation' => 'required|same:password',
            'user_role' => 'required|not_in:0',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
        $user_id   = User::getCompanyOrParentId();
        $adminUser = User::find($user_id);
        $pwd= strlen($request->password );
        $data = $this->userRepository->addUsersByAdmin($request, 'user');

        if($data) {
            return redirect($name . '/users')->with('message', "User " . $request->name . " has been added successfully.");

        }

    }
    public function getRecommendationsRecord($name = null) {
        $_data = [];
        $recommendation = Recommendations::get();

        return $recommendation;
        if(!empty($recommendation)){
            foreach ($recommendation as $r){
                $image = $editUrl ='';
                $imgU = explode('/storage/', $r->url);
                if(!empty($imgU[1])){

                //    url('storage/app/'.$imgU[1]);
               // $path =  Storage::url("/storage/app/{$imgU[1]}");
                $path =  Storage::disk('public')->path($imgU[1]);

                  $image =   '<img  id="profile_photo" style="width: 45px;height: 50px;" src="'.$path.'" class="img-responsive img-rounded" alt="">';
                }

               // $editUrl = '<a href= "' . url($name.'/edit-recommendations/'.$r->id) . '"><i class = "fa fa-pencil"></i>'.@$r->name.'</a> |';
                $delUrl = url($name.'/delete-recommendations/'.$r->id);

                $_data[] = array(


                    'Thumbnail' => $image,
                    'Name' => @$r->name,
                    'Comment' => @$r->comment,
                    'Actions'=> $editUrl. '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i>'.@$r->name.'</a>',


                );
            }

        }
       // echo '<pre>'; print_r($_data); die;

        return $_data;
    }
    public function recommendations($name) {

        $user_id = \Auth::User()->id;

        $data[ '_view_data' ] = $this->getRecommendationsRecord($name);

        $data[ 'name' ]               = $name;
        $data[ 'about' ]              = User::first();
        $data[ '_page_header' ]       = 'Recommendations';
        $data[ '_page_header_small' ] = "Recommendations";
        $data[ '_page_header_small' ] = 'Digit Logix';
        $data[ 'user_id' ]            = $user_id;
        $data[ 'active_tab' ]         = 'users_Management';
        $data[ 'active_tab_1' ]       = 'recommendations';

        return view('pages.recommendations', $data);
    }


    public function saveRecommendations (Request $request) {


        if ($request->hasFile('image')) {
            //  Let's do everything here
            if ($request->file('image')->isValid()) {
                //
                $validated = $request->validate([
                    'name'    => 'required',
                    'comment' => 'string|max:5000',
                    'image'   => 'mimes:jpeg,jpg,png|max:1014',
                ]);
                $extension = $request->image->extension();
                $randLength =  generateRandomString(8 );
               // $path = public_path('upload/' . $filename);
                $request->image->storeAs('/public', $randLength.".".$extension);
                $url = Storage::url($randLength.".".$extension);

                $file = Recommendations::create([
                    'comment' => $validated[ 'comment' ],
                    'url'     => $url,
                    'name'    => $validated[ 'name' ],
                ]);
                Session::flash('message', "Successfully added!");
                return \redirect()->back();
            }
        }
        abort(500, 'Could not upload image :(');
    }

    public function deleteRecommendations($name,$id) {


        $imageExist = Recommendations::where('id', $id)->first();

        if(isset($imageExist->url)) {

            $imgU = explode('/storage/', $imageExist->url);
            if(!empty($imgU[ 1 ])) {
                $path = Storage::disk('public')->path($imgU[ 1 ]);
                if(file_exists($path)) {
                    unlink($path);
                    $delete = Recommendations::where('id', $id)->delete();
                    Session::flash('message', "Deleted Successfully!");

                }

            }

            return \redirect()->back();

        }
    }

    public function saveAbout(Request $request) {
       $user =  User::first();
       if(isset($user->id)){
           $user->about = $request->about;
           $user->save();
           Session::flash('about', "About added Successfully!");
           return \redirect()->back();
       }
        abort(500, 'Could not upload image :(');
    }

    public function listQualification($qualification = []) {
        $_data = [];
        if(!empty($qualification)){
            foreach ($qualification as $key => $exp){
                $delUrl = url('delete-qualifications/'.$key);
                $_data[] = array(

                    'Start Date / End Date' => @$exp['start_date'].'/'. @$exp['end_date'],
                    'Description' => @$exp['qualifications'],
                    'Actions'=> '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i></a>',

                );
            }

        }
        return $_data;
    }

    public function listExperience($experience = []) {
        $_data = [];
        if(!empty($experience)){
            foreach ($experience as $key => $exp){

                $delUrl = url('delete-experience/'.$key);

                if(!empty( @$exp['total_exp']))
                {
                    $total_exp = @$exp['total_exp'];
                }else{
                    $total_exp = 'not found';
                }
                $_data[] = array(
                    'Experience'            => $total_exp . ' year',
                    'Start Date / End Date' => @$exp[ 'ex_start_date' ] . '/' .  @$exp['ex_end_date'],
                    'Description'           => @$exp[ 'experience' ],
                    'Actions'               => '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i></a>',

                );
            }

        }
        return $_data;
    }

    public function deleteExperience($id) {
      $data =   self::get_meta('experience' , '_experience');

      if(!empty($data)){
          $id = (int) $id;
          unset($data[$id]);

          self::reset_meta('experience', '_experience', $data);
          Session::flash('exMessage', "deleted Successfully!");
          return \redirect()->back();
      }
        abort(500, 'Something wrong Deleted Experience');
    }

    public function deleteQualification($id) {

        $data =   self::get_meta('qualifications' , '_qualifications');

        if(!empty($data)){

            $id = (int) $id;
            unset($data[$id]);

            self::reset_meta('qualifications', '_qualifications', $data);
            Session::flash('q_message', "deleted Successfully!");
            return \redirect()->back();
        }
        abort(500, 'Something wrong Deleted Experience');
    }
    public static function reset_meta($type, $meta_key, $meta_val = []) {

        $device_meta_array[ $meta_key ] = $meta_val;

        $user                           = Info::where('type', $type)->first();
        $user->descriptions             = NULL;
        $user->save();
        $user_                           = Info::where('type', $type)->first();
        if(isset($user_->id)){
            $user_->descriptions = $device_meta_array;
            $user_->save();
            return TRUE;
        }


    }
    public function resume($name = null) {
        $data[ '_view_data_exp' ] =  $data[ '_view_data' ]  = [];
        $user_id = \Auth::User()->id;

        $qualification               = self::get_meta('qualifications', '_qualifications' );
        if(!empty($qualification)){
            $data[ '_view_data' ] = $this->listQualification($qualification);
        }


        $experience               = self::get_meta('experience', '_experience');
        if(!empty($experience)){
            $data[ '_view_data_exp' ] = $this->listExperience($experience);
        }


        $data[ 'name' ]                        = $name;
        $data[ 'about' ]                       = User::first();
        $data[ '_page_header_Qualifications' ] = 'Qualifications';
        $data[ '_page_header_Experience' ]     = 'Experience';
        $data[ '_page_header' ]                = 'Resume';
        $data[ '_page_header_small' ]          = "Resume";
        $data[ '_page_header_small' ]          = 'Digit Logix';
        $data[ 'user_id' ]                     = $user_id;
        $data[ 'active_tab' ]                  = 'users_Management';
        $data[ 'active_tab_1' ]                = 'resume';

        return view('pages.resume', $data);
    }

    public function saveResume(Request  $request) {

        if(isset($request->_qualifications)){
            $a = ['start_date' => $request->start_date  , 'end_date' => $request->end_date ,  'qualifications' => $request->_qualifications ];
            $data = self::set_meta('qualifications', '_qualifications' , $a);

            if(!empty($data)){
                Session::flash('q_message', "Qualification Added Successfully!");
                return \redirect()->back();
            }


        }else if($request->_experience){
            $save_end_ex =  (!empty($request->ex_end_date)) ? $request->ex_end_date : 'current';
            $a = ['total_exp' => $request->total_exp ,'ex_start_date' => $request->ex_start_date  , 'ex_end_date' => $save_end_ex ,  'experience' => $request->_experience ];

            $data = self::set_meta('experience', '_experience' , $a);
            if(!empty($data)){
                Session::flash('exMessage', "Experience Added Successfully!");
                return \redirect()->back();
            }
        }
        abort(500, 'something wrong to added data');
    }

    public static function set_meta($type, $meta_key, $meta_val) {

        $user = Info::where('type',$type)->first();
        if(empty($user)){
            $user = new Info();
            $user->type = $type;
            $user->save();
        }
        if(isset($user->id)) {

            if (isset($user->descriptions)) {

                $device_meta_array = json_decode($user->descriptions, true);
                if (!empty($device_meta_array)) {
                    $device_meta_array[$meta_key][] = $meta_val;
                }

                $user->descriptions = json_encode($device_meta_array);
                $user->save();

                return true;

            }else{

                $user_meta_array = json_decode($user->descriptions, true);
                $user_meta_array = is_array($user_meta_array)? $user_meta_array: [];
                $user_meta_array[$meta_key][]= $meta_val;

                $user->descriptions = json_encode($user_meta_array);

                $user->save();
                return true;
            }


        }
    }

    public static function get_meta($type, $meta_key, $all_meta = false)  {
        $data = [];
        $user = Info::where('type', $type)->first(); //

        if(!empty($user)) {

            $user_meta_array = json_decode($user->descriptions, true);

            if(!empty($all_meta)) {

                $data = $user_meta_array;


            } else {

                $user_meta_array =  (!empty($user_meta_array[$meta_key]))? $user_meta_array[$meta_key] : false ;

                $data = $user_meta_array;


            }
        }

        return $data;
    }
    public function deleteProject($id) {

        $path = ItemDetails::where('item_id' , $id)->get();

        if(!empty($path)) {
            foreach ($path as $p) {
                if(file_exists($p->filename)) {
                    $p = Storage::disk('local')->path($p->filename);
                    unlink($p);
                }
            }
            Item::where('id', $id)->delete();
            Session::flash('message', "Record deleted successfully!");
        } else {
            Session::flash('danger', "Something wronged to delete file!");
        }
        return \redirect()->back();
    }
    /*public function deleteProject($id) {

       // $path = Item::where('id' , $id)->with('itemDetails')->first();
        $path = ItemDetails::where('item_id' , $id)->get();

        if(!empty($path)) {
            foreach ($path as $key => $p) {
                $link = Storage::disk('public')->path($p->filename);

                if(file_exists($link)) {

                    unlink($link);
               }
            }

            Item::where('id', $id)->delete();
            Session::flash('message', "Record deleted successfully!");
        } else {
            Session::flash('danger', "Something wronged to delete file!");
        }
        return \redirect()->back();
    }*/
    public function getUploadProject($type_id = null) {
        $_data = [];
        if(isset($type_id)){
            $items = Item::where('type' ,$type_id)->with('itemDetails')->get();
        }else{
            $items = Item::with('itemDetails')->get();
        }


        return $items;
        if(!empty($items)){
            foreach ($items as $key => $r){

                $delUrl = url('delete-project/'.@$r->id);

               $path =  Storage::disk('local')->path(@$r->itemDetails[0]->filename);
                //$path =  asset('storage/'.@$r->itemDetails[0]->filename);

                $image =   '<img  id="profile_photo" style="width: 45px;height: 50px;" src="'.$path.'" class="img-responsive img-rounded" alt="">';
                $_data[] = array(

                    'Thumbnail'    => @$image,
                    'Name'         => @$r->name,
                    'Url'          => @$r->url,
                    'Descriptions' => @$r->descriptions,
                    'technology'   => @$r->technology,
                    'Actions'      => '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i> ' . @$r->name . '</a>',

                );
            }
        }

       return $_data;
    }
    public function uploadProjectForm() {

        $items = $this->getUploadProject();

        $data[ 'name' ]               = \Auth::User()->name;
        $data[ 'adminProfile' ]       = User::where('id', \Auth::User()->id)->first();
        $data[ 'id' ]                 = \Auth::User()->id;
        $data[ '_page_header' ]       = 'Projects';
        $data[ '_page_header_small' ] = 'Projects';
        $data[ 'active_tab' ]         = 'users_Management';
        $data[ 'active_tab_1' ]       = 'multi_project';
        $data[ '_view_data' ]         = $items;
        return view('project_upload', $data);
    }

    public function uploadProjectJson(Request  $request) {

        $res = $this->getUploadProject($request->type_id);
        return $res;
    }

    public function uploadProjectSubmit(Request $request) {

        $this->validate($request, [
            'name' => 'required',
            'photos'=>'required|max:1014',
        ]);

        $elements = [];
        if($request->hasFile('photos'))
        {

            $elements = [
                'name'         => $request->name,
                'type'         => $request->type,
                'url'          => (!empty($request->url)) ? $request->url : NULL,
                'descriptions' => (!empty($request->descriptions)) ? $request->descriptions : NULL,
                'technology'   => (!empty($request->technology)) ? json_encode($request->technology) : NULL,
            ];
            $items= Item::create($elements);
           // $allowedfileExtension=['pdf','jpg','jpeg','png','docx'];
            $allowedfileExtension=['jpg','jpeg','png'];
            $files = $request->file('photos');
            foreach ($files as $file) {
                $extension  = $file->getClientOriginalExtension();
                $randLength = generateRandomString(8);
                $check      = in_array($extension, $allowedfileExtension);
                if($check) {
                 //   echo '<pre>'; print_r($file); die;
                    $file->storeAs('/public', $randLength.".".$extension);
                    $filename = Storage::url($randLength.".".$extension);

                   // $filename = $file->store('photos');
                    ItemDetails::create([
                        'item_id'  => $items->id,
                        'filename' => $filename
                    ]);

                } else {
                    Session::flash('danger', "sorry only upload png ,jpeg, jpg , doc");
                    return \redirect()->back();
                }

            }
            Session::flash('message', "Record added successfully!");
            return \redirect()->back();

        }else{
            Session::flash('danger', "something wronged to add data!");
            return \redirect()->back();
        }
    }

    public function getMainPage() {

        $data[ 'user' ]            = getUserDetails();
        $data[ 'recommendations' ] = getRecommendations();
        $data[ 'experience' ]      = getExperience();
        $data[ 'qualification' ]   = getQualifications();
        $data[ 'items' ]           = getProjects();
        $data[ 'socials' ]          = getSocials();

        return view('welcome' ,$data);
    }
    public function contactUS(Request $request) {

        Contact::create([
            'form_name'  => $request->name,
            'form_email' => $request->email,
            'form_message' => $request->message
        ]);
        try {
            $params[ 'from' ] = 'info@digitlogix.com';
            $params[ 'data' ]  = [
                'main'    => 'DigitLogix',
                'title'   => $request->name,
                'body'    => $request->message,
                'year'    => Carbon::now()->format('Y'),
                'website' => 'http://digitlogix.com/',
            ];


            Mail::send('mail_template',$params, function ($message) use ($request) {

                $message->to('Digitlogix1@gmail.com');
                $message->from('info@digitlogix.com');
                $message->subject('contact us');
            });
        } catch (\Exception $e) {

            echo '<pre>';
            dd($e->getMessage());
            die;
        }

        return true;
    }

    public function getContact() {
        $_data                        = [];
        $data[ 'name' ]               = \Auth::User()->name;
        $data[ 'adminProfile' ]       = User::where('id', \Auth::User()->id)->first();
        $data[ 'id' ]                 = \Auth::User()->id;
        $data[ '_page_header' ]       = 'Contact';
        $data[ '_page_header_small' ] = 'Contact';
        $data[ 'active_tab' ]         = 'users_Management';
        $data[ 'active_tab_1' ]       = 'contact_us';

        $contact = Contact::get();
        if(!empty($contact)){
            foreach ($contact as $key => $r){

                $delUrl = url('delete-contact/'.@$r->id);

                $_data[] = array(

                    'Name'         => @$r->form_name,
                    'Url'          => @$r->form_email,
                    'Descriptions' => '  <textarea name="message" class="form-control" rows="4">'.@$r->form_message.'</textarea>',
                    'Actions'      => '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i> ' . @$r->name . '</a>',

                );
            }
        }
        $data[ '_view_data' ]         = $_data;

        return view('contact_us', $data);

    }

    public function deleteContact($id) {
        $contact = Contact::find($id)->delete();
        if($contact){
            Session::flash('message', "Record deleted successfully.");
            return \redirect()->back();
        }
        abort(500, 'Opps! something wronged to delete record');
    }

    public function projectDetails($item_id  = null) {

        $type_view = null;
        $item = Item::where('id' ,$item_id)->first();
        $items = ItemDetails::where('item_id' ,$item_id)->get();

        $type_view = \View::make('project-details', [
           'item' => $item,
           'items' => $items,
        ])->render();

        return $type_view;

    }

    public function getSocialForm() {

        $data[ 'name' ]               = \Auth::User()->name;
        $data[ 'adminProfile' ]       = SocialLink::first();
        $data[ 'id' ]                 = \Auth::User()->id;
        $data[ '_page_header' ]       = 'Social Links';
        $data[ '_page_header_small' ] = 'Social Links';
        $data[ 'active_tab' ]         = 'users_Management';
        $data[ 'active_tab_1' ]       = 'social_links';
        return view('social', $data);
    }
    public function saveSocialForm(Request $request) {
        $social =  new SocialLink();

        $social->linkedin  = $request->linkedin;
        $social->facebook  = $request->facebook;
        $social->twitter   = $request->twitter;
        $social->github    = $request->github;
        $social->instagram = $request->instagram;
        $social->save();
        Session::flash('message', "Links added Successfully!");
        return \redirect()->back();

        abort(500, 'Could not upload image :(');
    }
}
