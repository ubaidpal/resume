<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
class UsersTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        $email = 'admin@digitlogix.com';
        $user  = User::where('email', $email)->first();
        if(!isset($user->id)) {
            User::create(array(
                'name'     => 'Digitlogix',
                'email'    => $email,
                'password' => bcrypt('admin123'),
                'avatar'   => NULL,
            ));

        }

    }
}
