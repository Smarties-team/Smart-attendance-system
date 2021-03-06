<?php

namespace App\Http\Controllers;

use App\Models\Student;
use http\Env\Response;
use Illuminate\Http\Request;
use mysql_xdevapi\Exception;
use PhpParser\Node\Expr\Array_;
use Illuminate\Support\Facades\DB;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Console
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();

//        return Student::all();
        $q = DB::table('students')
            ->leftJoin('students_logs', 'students.id', '=', 'students_logs.student_id')
            ->select('id', 'name', 'address', 'grade', 'national_id', 'email', 'photo', 'entered_at', 'left_at')
            ->whereIn('entered_at', function ($query){
                $query->selectRaw('max(entered_at)')->from('students_logs')->groupBy('student_id');
            })->orWhereNotExists(function ($query){
                $query->select('id')->from('students')->whereRaw('id = students_logs.student_id');
            });

        $out->writeln($q->toSql());

        $students = $q->get();
//        $students = DB::table('students')
//            ->join('students_logs', 'students.id', '=', 'students_logs.student_id')
//            ->select('id', 'name', 'address', 'grade', 'national_id', 'email', 'entered_at', 'left_at')
//            ->whereIn('entered_at', function ($query){
//                $query->selectRaw('max(entered_at)')->from('students_logs')->groupBy('student_id');
//            })->orWhereNotExists(function ($query){
//                $query->select('id')->from('students')->where('id', '=', 'students_logs.student_id');
//            })
//            ->get();


        return $students;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Console
        $out = new \Symfony\Component\Console\Output\ConsoleOutput();

        $out->writeln("input key name: " . $request->input('name'));
        $out->writeln("all keys: " . json_encode($request->keys()));

        $photo_path = "";

        try {

            $name = $request->name; // Student name entered in the form

            // Check the uploaded file (Photo) validity and store it in the disk
            if ($request->hasFile('myfile')) {
                $f = $request->file('myfile');

                // Store in public drive
                $photo_path = $f->storeAs('students_photos', $name . '.' . $f->extension(), 'public');
                $out->writeln("path: " . $photo_path);
            } else {
                throw new \Exception("No photo uploaded");
            }

            // Create a new student record and store in the database
            $student = new Student;
            $student->name = $request->input('name');
            $student->address = $request->address;
            $student->grade = $request->grade;
            $student->national_id = $request->natID;
            $student->photo = $photo_path;
            $student->email = '';
            $student->save();

            $out->writeln("id: " . $student->id);


            // -------- Run face recognition depending on the environment -------- //
            $command = '';

            $current_environment = env('APP_ENV');

            if($current_environment == 'local')
            {
                // My local environment depends on conda python environment called env36
                $command = 'conda activate env36 && python ./recognizeStudent.py ' . $student->id;
            }
            else
            {
                $command = 'python3 ./recognizeStudent.py ' . $student->id;
            }

            $escaped_command = escapeshellcmd($command);    // Handle special characters for security
            $escaped_command .= ' 2>&1';    // Redirect stderr to stdout
            $output = shell_exec($escaped_command);

            $out->writeln("Python Output: " . $output);

            // Check face recognition success
            if (trim($output) == 'Success') {
                return "Add student success";
            }
            else {
                throw new \Exception("Face recognition failed, " . $output);
            }

            // ------------------------------------------------------------------------ //

        }
        // Print error message and discard given data
        catch (\Exception $e) {

            $out->writeln('error:' . " with message: " . $e->getMessage());
            if (isset($student)) $student->delete();
            return "Failed to add student, " . $e->getMessage();
        }

//    $request->dump(); // dump raw payload !!!!!!!!!!

        // This should never be reached
        return "Failed to add student";
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Student $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Students $students
     * @return \Illuminate\Http\Response
     */
    public function edit(Students $students)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Students $students
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Students $students)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Students $students
     * @return \Illuminate\Http\Response
     */
    public function destroy(Students $students)
    {
        //
    }
}
